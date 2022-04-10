import { ProductProps } from '../../utils/interface';
import { ProductCatalog } from '../../domain/ProductCatalog';

interface ProductCatalogTableInterface {
  render();
}

export class ProductCatalogTable implements ProductCatalogTableInterface {
  #productCatalog: ProductCatalog;
  #target: HTMLDivElement;
  #productTableBody: HTMLTableElement;

  constructor({ target, productCatalog }) {
    this.#target = target;
    this.#productCatalog = productCatalog;

    this.#target.addEventListener('productAdded', this.#renderAddedProduct);
  }

  render = () => {
    this.#target.insertAdjacentHTML('beforeend', this.#template());

    this.#selectDOM();
    this.#bindEvent();
  };

  #selectDOM() {
    this.#productTableBody = document.querySelector('.product-table-body');
  }

  #bindEvent() {
    this.#productTableBody.addEventListener('click', this.#handleProductStateManage);
    document.addEventListener('productPurchased', this.#updatePurchasedProduct);
  }

  #renderAddedProduct = (e: CustomEvent) => {
    const addedProduct = e.detail;
    this.#productTableBody.insertAdjacentHTML('beforeend', this.#tableRowTemplate(addedProduct));
  };

  #updatePurchasedProduct = (e: CustomEvent) => {
    const { name } = e.detail;

    const tableRow = this.#productTableBody.querySelector(`#${name}`);

    const quantitySpan = tableRow.querySelector('.product-quantity > span');

    let decreasedQuantity = Number(quantitySpan.textContent) - 1;

    quantitySpan.textContent = String(decreasedQuantity);
  };

  #template() {
    return `
    <div class="table-container">
      <h2>상품 현황</h2>
      <table id="product-table">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
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
      <td class="edit-button-container">
        <button class="edit-button button" type="button">수정</button>
        <button class="delete-button button" type="button">삭제</button>
        <button class="confirm-button button hide" type="button">확인</button>
      </td>
    </tr>`;
  }

  #handleProductStateManage = (e) => {
    if (e.target.classList.contains('edit-button')) {
      const tableRow = e.target.closest('tr');
      this.#renderEditProduct(tableRow);

      return;
    }

    if (e.target.classList.contains('delete-button')) {
      const tableRow = e.target.closest('tr');
      this.#deleteProduct(tableRow);

      return;
    }

    if (e.target.classList.contains('confirm-button')) {
      const tableRow = e.target.closest('tr');

      try {
        this.#saveEditedProduct(tableRow);
        this.#confirmEditProduct(tableRow);
        this.#toggleEditBtn(tableRow);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  #renderEditProduct = (tableRow: HTMLTableRowElement) => {
    const productRowItems = tableRow.querySelectorAll('.product-prop');

    productRowItems.forEach((tableDatum) => {
      const productSpanElement = tableDatum.querySelector('span');
      const content = productSpanElement.textContent;

      tableDatum.replaceChild(
        this.#createProductInputElement(tableDatum, content),
        productSpanElement
      );
    });

    this.#toggleEditBtn(tableRow);
  };

  #createProductInputElement(tableDatum: Element, content: string): HTMLInputElement {
    const productInputElement = document.createElement('input');

    productInputElement.setAttribute(
      'type',
      `${tableDatum.classList.contains('product-name') ? 'text' : 'number'}`
    );
    productInputElement.classList.add('product-input');
    productInputElement.value = content;

    return productInputElement;
  }

  #deleteProduct(tableRow: HTMLTableRowElement) {
    if (window.confirm('진짜 지우실건가요?')) {
      tableRow.remove();
      this.#productCatalog.deleteProduct(tableRow.id);

      this.#target.dispatchEvent(
        new CustomEvent('productDeleted', { detail: { name: tableRow.id }, bubbles: true })
      );
    }
  }

  #saveEditedProduct(tableRow: HTMLTableRowElement) {
    const targetProductName = tableRow.id;
    const editedProductName = (tableRow.querySelector('.product-name input') as HTMLInputElement)
      .value;
    const editedProductPrice = (tableRow.querySelector('.product-price input') as HTMLInputElement)
      .valueAsNumber;
    const editedProductQuantity = (
      tableRow.querySelector('.product-quantity input') as HTMLInputElement
    ).valueAsNumber;

    this.#productCatalog.editProduct(targetProductName, {
      name: editedProductName,
      price: editedProductPrice,
      quantity: editedProductQuantity,
    });

    this.#target.dispatchEvent(
      new CustomEvent('productEdited', {
        detail: {
          targetName: targetProductName,
          name: editedProductName,
          price: editedProductPrice,
          quantity: editedProductQuantity,
        },
        bubbles: true,
      })
    );
  }

  #confirmEditProduct(tableRow: HTMLTableRowElement) {
    const productProp = tableRow.querySelectorAll('.product-prop');

    productProp.forEach((tableDatum) => {
      const productInputElement = tableDatum.querySelector('input');
      const editedValue = productInputElement.value;

      tableDatum.replaceChild(this.#createProductSpanElement(editedValue), productInputElement);
    });

    tableRow.id = `${tableRow.querySelector('.product-name').textContent}`;
  }

  #createProductSpanElement(editedValue: string): HTMLSpanElement {
    const productSpanElement = document.createElement('span');
    productSpanElement.textContent = editedValue;

    return productSpanElement;
  }

  #toggleEditBtn(tableRow: HTMLTableRowElement) {
    [...tableRow.querySelector('.edit-button-container').children].forEach((btn) =>
      btn.classList.toggle('hide')
    );
  }
}
