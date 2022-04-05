import { ProductCatalog } from '../domain/ProductCatalog';
import { PurchaseMoney } from '../domain/PurchaseMoney';

import { ProductProps } from '../utils/interface';

interface PurchasableProductCatalogTableInterface {}

export class PurchasableProductCatalogTable implements PurchasableProductCatalogTableInterface {
  #target: HTMLDivElement;
  #productCatalog: ProductCatalog;
  #purchasableProductTable: HTMLTableElement;
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
          <button class="purchase-button button" type="button" data-product-id="${name}">구매</button>
        </td>
      </tr>`;
  }

  #selectDOM() {
    this.#purchasableProductTable = document.querySelector('#purchasable-product-table');
  }

  #bindEvent() {
    this.#purchasableProductTable.addEventListener('click', this.#handlePurchaseProduct);
  }

  #handlePurchaseProduct = (e) => {
    if (e.target.matches('.purchase-button')) {
      // TODO: 0개일때는 구매 못하도록 해야함
      const productName = e.target.dataset.productId;

      try {
        const exchange = this.#productCatalog.buyProduct(
          productName,
          this.#purchaseMoney.getMoney()
        );

        this.#purchaseMoney.setMoney(exchange);
        this.#target.dispatchEvent(new CustomEvent('productPurchased'));

        const tableRow = e.target.closest(`#${productName}`);
        this.#renderPurchasedProduct(tableRow);

        // TODO: 상품 관리 테이블 업데이트 해줘야함
      } catch (err) {
        alert(err.message);
      }
    }
  };

  #renderPurchasedProduct(tableRow: HTMLTableRowElement) {
    const quantitySpan = tableRow.querySelector('.product-quantity > span');

    let decreasedQuantity = Number(quantitySpan.textContent) - 1;

    quantitySpan.textContent = String(decreasedQuantity);

    if (decreasedQuantity === 0) {
      const purchaseBtn = tableRow.querySelector('.purchase-button') as HTMLButtonElement;

      purchaseBtn.disabled = true;
    }
  }
}
