import { ProductCatalog } from '../domain/ProductCatalog';
import { ProductState } from '../utils/interface';

export class ProductCatalogTable {
  productCatalog: ProductCatalog;
  target: HTMLDivElement;
  productTable: HTMLTableElement;
  productTableBody: HTMLTableElement;
  constructor(props) {
    this.target = props.target;
    this.productCatalog = props.productCatalog;

    this.target.addEventListener('productAdded', this.render);
  }

  templates(): string {
    return `
      <div class='table-container'>
        <h2>상품 현황</h2>
        <table id='product-table'>
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody id ='product-table-body'>${this.tableBodyTemplate()}</tbody>
        </table>
      </div>
    `;
  }

  tableBodyTemplate(): string {
    return this.productCatalog.productList
      .map((product) => this.tableRowTemplate(product))
      .join('');
  }

  tableRowTemplate(product): string {
    return `<tr id = '${product.getName()}'>
    <td class='product-name product-prop'><span>${product.getName()}</span></td>
    <td class='product-price product-prop'><span>${product.getPrice()}</span></td>
    <td class='product-quantity product-prop'><span>${product.getQuantity()}</span></td>
    <td class='edit-button-container'>
      <button class='edit-button button' type='button'>수정</button>
      <button class='delete-button button' type='button'>삭제</button>
      <button class='confirm-button button hide' type='button'>확인</button>
    </td>
  </tr>`;
  }

  tableContainer: HTMLDivElement;
  render = () => {
    if (this.isRerender()) {
      this.productTableBody.textContent = ``;
      this.productTableBody.insertAdjacentHTML('beforeend', this.tableBodyTemplate());
      return;
    }
    this.target.insertAdjacentHTML('beforeend', this.templates());
    this.productTableBody = document.querySelector('#product-table-body');
    this.productTableBody.addEventListener('click', this.handleProductStateManage);
  };

  isRerender(): boolean {
    return this.productTableBody !== undefined;
  }

  handleProductStateManage = (e) => {
    if (e.target.classList.contains('edit-button')) {
      this.editProduct(e.target.parentNode.parentNode);
    }

    if (e.target.classList.contains('delete-button')) {
      this.deleteProduct(e.target.parentNode.parentNode);
    }

    if (e.target.classList.contains('confirm-button')) {
      const tableRow = e.target.parentNode.parentNode;
      try {
        this.saveEditedProductProp(e.target.parentNode.parentNode);
        this.confirmEditProduct(e.target.parentNode.parentNode);
        this.toggleEditBtn(e.target.parentNode.parentNode);
      } catch (err) {
        alert(err);
      }
    }
  };

  editProduct = (tableRow: HTMLTableRowElement) => {
    const productRowItems = tableRow.querySelectorAll('.product-prop');

    productRowItems.forEach((tableDatum) => {
      const currentProductElement = tableDatum.firstChild;
      tableDatum.replaceChild(this.editProductTemplateElement(tableDatum), currentProductElement);
    });

    this.toggleEditBtn(tableRow);
  };

  editProductTemplateElement(tableDatum: Element): HTMLInputElement {
    const after = document.createElement('input');
    after.setAttribute(
      'type',
      `${tableDatum.classList.contains('product-name') ? 'text' : 'number'}`
    );
    after.className += 'product-input';
    after.value = `${tableDatum.firstChild.textContent}`;
    return after;
  }

  toggleEditBtn(tableRow: HTMLTableRowElement) {
    [...tableRow.querySelector('.edit-button-container').children].forEach((btn) =>
      btn.classList.toggle('hide')
    );
  }

  confirmEditProduct(tableRow: HTMLTableRowElement) {
    const productProp = tableRow.querySelectorAll('.product-prop');

    [...productProp].forEach((tableDatum) => {
      const currentProductElement = tableDatum.firstChild;
      tableDatum.replaceChild(
        this.confirmedProductTemplateElement(tableDatum),
        currentProductElement
      );
    });

    tableRow.id = `${tableRow.querySelector('.product-name').textContent}`;
  }

  confirmedProductTemplateElement(tableDatum: Element): HTMLSpanElement {
    const after = document.createElement('span');

    after.insertAdjacentHTML('beforeend', `${(tableDatum.firstChild as HTMLInputElement).value}`);
    return after;
  }

  saveEditedProductProp(tableRow: HTMLTableRowElement): boolean {
    const productState = {
      index: this.productCatalog.findExistingProductIndex(tableRow.id),
      name: (tableRow.querySelector('.product-name').firstChild as HTMLInputElement).value,
      price: (tableRow.querySelector('.product-price').firstChild as HTMLInputElement)
        .valueAsNumber,
      quantity: (tableRow.querySelector('.product-quantity').firstChild as HTMLInputElement)
        .valueAsNumber,
    };

    if (this.canSave(productState)) {
      this.productCatalog.productList[productState.index].setName(productState.name);
      this.productCatalog.productList[productState.index].setPrice(productState.price);
      this.productCatalog.productList[productState.index].setQuantity(productState.quantity);
      return true;
    }
    return false;
  }

  canSave(productState: ProductState) {
    try {
      this.productCatalog.productList[productState.index].validateName(productState.name);
      this.productCatalog.productList[productState.index].validatePrice(productState.price);
      this.productCatalog.productList[productState.index].validateQuantity(productState.quantity);
      return true;
    } catch (err) {
      throw err;
    }
  }

  deleteProduct(tableRow: HTMLTableRowElement) {
    if (window.confirm('진짜 지우실건가요?')) {
      tableRow.remove();
      this.productCatalog.deleteProductByName(tableRow.id);
    }
  }
}
