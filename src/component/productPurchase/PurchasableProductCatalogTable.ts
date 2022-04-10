import { ProductCatalog } from '../../domain/ProductCatalog';
import { PurchaseMoney } from '../../domain/PurchaseMoney';

import { ProductProps } from '../../utils/interface';

interface PurchasableProductCatalogTableInterface {
  render();
}

export class PurchasableProductCatalogTable implements PurchasableProductCatalogTableInterface {
  #target: HTMLDivElement;
  #purchasableProductTable: HTMLTableElement;
  #productTableBody: HTMLTableCellElement;
  #productCatalog: ProductCatalog;
  #purchaseMoney: PurchaseMoney;

  constructor({ target, productCatalog, purchaseMoney }) {
    this.#target = target;
    this.#productCatalog = productCatalog;
    this.#purchaseMoney = purchaseMoney;
  }

  render = () => {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
    this.#selectDOM();
    this.#bindEvent();
  };

  #template() {
    return `
        <div class="table-container">
        <h2>구매 가능 상품현황</h2>
        <table id="purchasable-product-table">
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
              <th>구매</th>
            </tr>
          </thead>
          <tbody class="product-table-body">${this.#tableBodyTemplate()}</tbody>
        </table>
      </div>
      `;
  }

  #tableBodyTemplate(): string {
    return this.#productCatalog
      .getProductList()
      .map((product) => {
        const name = product.getName();
        const price = product.getPrice();
        const quantity = product.getQuantity();

        return this.#tableRowTemplate({ name, price, quantity });
      })
      .join('');
  }

  #tableRowTemplate({ name, price, quantity }: ProductProps): string {
    return `<tr id="${name}">
        <td class="product-name product-prop"><span>${name}</span></td>
        <td class="product-price product-prop"><span>${price}</span></td>
        <td class="product-quantity product-prop"><span>${quantity}</span></td>
        <td>
          <button class="purchase-button button" type="button" data-product-id="${name}" 
          ${quantity === 0 && 'disabled'}>
          ${quantity === 0 ? '품절' : '구매'}</button>
        </td>
      </tr>`;
  }

  #selectDOM() {
    this.#purchasableProductTable = document.querySelector('#purchasable-product-table');
    this.#productTableBody = document.querySelector('.product-table-body');
  }

  #bindEvent() {
    this.#purchasableProductTable.addEventListener('click', this.#handlePurchaseProduct);
    document.addEventListener('productAdded', this.#updateAddedProduct);
    document.addEventListener('productDeleted', this.#updatedDeletedProduct);
    document.addEventListener('productEdited', this.#updateEditedProduct);
  }

  #handlePurchaseProduct = (e) => {
    if (e.target.matches('.purchase-button')) {
      const productName = e.target.dataset.productId;

      try {
        const exchange = this.#productCatalog.buyProduct(
          productName,
          this.#purchaseMoney.getMoney()
        );

        this.#purchaseMoney.setMoney(exchange);
        this.#target.dispatchEvent(
          new CustomEvent('productPurchased', { detail: { name: productName }, bubbles: true })
        );

        this.#target.dispatchEvent(
          new CustomEvent('showSnackbar', {
            detail: { type: 'success', message: `${productName}를(을) 구매하였습니다` },
          })
        );

        const tableRow = e.target.closest(`#${productName}`);
        this.#updatePurchasedProduct(tableRow);
      } catch (err) {
        this.#target.dispatchEvent(
          new CustomEvent('showSnackbar', {
            detail: { type: 'fail', message: err.message },
          })
        );
      }
    }
  };

  #updatePurchasedProduct(tableRow: HTMLTableRowElement) {
    const quantitySpan = tableRow.querySelector('.product-quantity > span');

    let decreasedQuantity = Number(quantitySpan.textContent) - 1;

    quantitySpan.textContent = String(decreasedQuantity);

    if (decreasedQuantity === 0) {
      const purchaseBtn = tableRow.querySelector('.purchase-button') as HTMLButtonElement;

      purchaseBtn.disabled = true;
      purchaseBtn.textContent = '품절';
    }
  }

  #updateAddedProduct = (e: CustomEvent) => {
    const addedProduct = e.detail;

    this.#productTableBody.insertAdjacentHTML('beforeend', this.#tableRowTemplate(addedProduct));
  };

  #updatedDeletedProduct = (e: CustomEvent) => {
    const { name } = e.detail;

    this.#productTableBody.querySelector(`#${name}`).remove();
  };

  #updateEditedProduct = (e: CustomEvent) => {
    const { targetName, name, price, quantity } = e.detail;
    const tableRow = this.#productTableBody.querySelector(`#${targetName}`);
    tableRow.id = name;

    const nameSpan = tableRow.querySelector('.product-name > span');
    const priceSpan = tableRow.querySelector('.product-price > span');
    const quantitySpan = tableRow.querySelector('.product-quantity > span');
    const purchaseButton = tableRow.querySelector('.purchase-button') as HTMLButtonElement;

    nameSpan.textContent = name;
    priceSpan.textContent = price;
    quantitySpan.textContent = quantity;
    purchaseButton.dataset.productId = name;
    purchaseButton.disabled = quantity === 0 ? true : false;
    purchaseButton.textContent = quantity === 0 ? '품절' : '구매';
  };
}
