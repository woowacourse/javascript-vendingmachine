import { Product } from '../domain/Product';
import { ProductCatalog } from '../domain/ProductCatalog';

export class ProductCatalogTable {
  #productCatalog: ProductCatalog;
  #target: HTMLDivElement;
  #productTableBody: HTMLTableElement;

  constructor(props) {
    this.#target = props.target;
    this.#productCatalog = props.productCatalog;

    this.#target.addEventListener('productAdded', this.render);
  }

  render = () => {
    if (this.isRerender()) {
      this.#productTableBody.textContent = '';
      this.#productTableBody.insertAdjacentHTML('beforeend', this.tableBodyTemplate());

      return;
    }

    this.#target.insertAdjacentHTML('beforeend', this.template());

    this.#productTableBody = document.querySelector('#product-table-body');
    this.#productTableBody.addEventListener('click', this.handleProductStateManage);
  };

  private isRerender(): boolean {
    return this.#productTableBody !== undefined;
  }

  private template(): string {
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
        <tbody id="product-table-body">${this.tableBodyTemplate()}</tbody>
      </table>
    </div>
  `;
  }

  private tableBodyTemplate(): string {
    return this.#productCatalog
      .getProductList()
      .map((product) => this.tableRowTemplate(product))
      .join('');
  }

  private tableRowTemplate(product: Product): string {
    return `<tr id="${product.getName()}">
      <td class="product-name product-prop"><span>${product.getName()}</span></td>
      <td class="product-price product-prop"><span>${product.getPrice()}</span></td>
      <td class="product-quantity product-prop"><span>${product.getQuantity()}</span></td>
      <td class="edit-button-container">
        <button class="edit-button button" type="button">수정</button>
        <button class="delete-button button" type="button">삭제</button>
        <button class="confirm-button button hide" type="button">확인</button>
      </td>
    </tr>`;
  }

  private handleProductStateManage = (e) => {
    if (e.target.classList.contains('edit-button')) {
      const tableRow = e.target.closest('tr');
      this.renderEditProduct(tableRow);

      return;
    }

    if (e.target.classList.contains('delete-button')) {
      const tableRow = e.target.closest('tr');
      this.deleteProduct(tableRow);

      return;
    }

    if (e.target.classList.contains('confirm-button')) {
      const tableRow = e.target.closest('tr');

      try {
        this.saveEditedProduct(tableRow);
      } catch (err) {
        alert(err.message);

        return;
      }

      this.confirmEditProduct(tableRow);
      this.toggleEditBtn(tableRow);
    }
  };

  private renderEditProduct = (tableRow: HTMLTableRowElement) => {
    const productRowItems = tableRow.querySelectorAll('.product-prop');

    productRowItems.forEach((tableDatum) => {
      const productSpanElement = tableDatum.querySelector('span');
      const content = productSpanElement.textContent;

      tableDatum.replaceChild(
        this.createProductInputElement(tableDatum, content),
        productSpanElement
      );
    });

    this.toggleEditBtn(tableRow);
  };

  private createProductInputElement(tableDatum: Element, content: string): HTMLInputElement {
    const productInputElement = document.createElement('input');

    productInputElement.setAttribute(
      'type',
      `${tableDatum.classList.contains('product-name') ? 'text' : 'number'}`
    );
    productInputElement.classList.add('product-input');
    productInputElement.value = content;

    return productInputElement;
  }

  private deleteProduct(tableRow: HTMLTableRowElement) {
    if (window.confirm('진짜 지우실건가요?')) {
      tableRow.remove();
      this.#productCatalog.deleteProduct(tableRow.id);
    }
  }

  private saveEditedProduct(tableRow: HTMLTableRowElement) {
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
  }

  private confirmEditProduct(tableRow: HTMLTableRowElement) {
    const productProp = tableRow.querySelectorAll('.product-prop');

    productProp.forEach((tableDatum) => {
      const productInputElement = tableDatum.querySelector('input');
      const editedValue = productInputElement.value;

      tableDatum.replaceChild(this.createProductSpanElement(editedValue), productInputElement);
    });

    tableRow.id = `${tableRow.querySelector('.product-name').textContent}`;
  }

  private createProductSpanElement(editedValue: string): HTMLSpanElement {
    const productSpanElement = document.createElement('span');
    productSpanElement.innerText = editedValue;

    return productSpanElement;
  }

  private toggleEditBtn(tableRow: HTMLTableRowElement) {
    [...tableRow.querySelector('.edit-button-container').children].forEach((btn) =>
      btn.classList.toggle('hide')
    );
  }
}
