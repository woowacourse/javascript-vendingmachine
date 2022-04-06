import { Product } from '../domain/Product';
import { ProductCatalog } from '../domain/ProductCatalog';
import { ProductState } from '../interfaces/interface';
import { validateAllProductProps } from '../utils/domain.utils';
import { getStorageProductCatalog } from '../utils/sessionStorage';

export class ProductCatalogTable {
  productCatalog: ProductCatalog;
  target: HTMLDivElement;
  productTable: HTMLTableElement;
  productTableBody: HTMLTableElement;

  constructor(props) {
    this.target = props.target;
    this.productCatalog = props.productCatalog;

    this.target.addEventListener('productAdded', this.renderTable);
  }

  setProductCatalog(productCatalog) {
    this.productCatalog = productCatalog;
  }

  render = () => {
    this.target.insertAdjacentHTML('beforeend', this.template());

    this.productTableBody = document.querySelector('#product-table-body');
    this.productTableBody.insertAdjacentHTML('beforeend', this.tableBodyTemplate());
    this.productTableBody.addEventListener('click', this.handleProductStateManage);
  };

  renderTable = () => {
    this.productCatalog = getStorageProductCatalog();
    this.productTableBody.textContent = '';
    this.productTableBody.insertAdjacentHTML('beforeend', this.tableBodyTemplate());
    this.productTableBody.addEventListener('click', this.handleProductStateManage);
  };

  isRerendered(): boolean {
    return this.productTableBody !== undefined;
  }

  template(): string {
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
        <tbody id ='product-table-body'></tbody>
      </table>
    </div>
  `;
  }

  tableBodyTemplate(): string {
    return this.productCatalog.productList
      .map((product) => this.tableRowTemplate(product))
      .join('');
  }

  tableRowTemplate(product: Product): string {
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

  handleProductStateManage = (e) => {
    if (e.target.classList.contains('edit-button')) {
      this.renderEditProduct(e.target.parentNode.parentNode);
    }

    if (e.target.classList.contains('delete-button')) {
      this.deleteProduct(e.target.parentNode.parentNode);
    }

    if (e.target.classList.contains('confirm-button')) {
      const tableRow = e.target.parentNode.parentNode;
      try {
        this.saveEditedProductState(tableRow);
        this.confirmEditProduct(tableRow);
        this.toggleEditBtn(tableRow);
      } catch (err) {
        alert(err);
      }
    }
  };

  renderEditProduct = (tableRow: HTMLTableRowElement) => {
    const productRowItems = tableRow.querySelectorAll('.product-prop');

    productRowItems.forEach((tableDatum) => {
      const productSpanElement = tableDatum.firstChild;
      tableDatum.replaceChild(this.createProductInputElement(tableDatum), productSpanElement);
    });

    this.toggleEditBtn(tableRow);
  };

  createProductInputElement(tableDatum: Element): HTMLInputElement {
    const productInputElement = document.createElement('input');
    productInputElement.setAttribute(
      'type',
      `${tableDatum.classList.contains('product-name') ? 'text' : 'number'}`
    );
    productInputElement.className += 'product-input';
    productInputElement.value = `${tableDatum.firstChild.textContent}`;
    return productInputElement;
  }

  deleteProduct(tableRow: HTMLTableRowElement) {
    if (window.confirm('진짜 지우실건가요?')) {
      tableRow.remove();
      this.productCatalog.deleteProductByName(tableRow.id);
    }
  }

  saveEditedProductState(tableRow: HTMLTableRowElement) {
    const productState = {
      index: this.productCatalog.findExistingProductIndex(tableRow.id),
      name: (tableRow.querySelector('.product-name').firstChild as HTMLInputElement).value,
      price: (tableRow.querySelector('.product-price').firstChild as HTMLInputElement)
        .valueAsNumber,
      quantity: (tableRow.querySelector('.product-quantity').firstChild as HTMLInputElement)
        .valueAsNumber,
    };

    const targetProduct = this.productCatalog.productList[productState.index];
    if (this.isSavable(productState)) {
      targetProduct.setName(productState.name);
      targetProduct.setPrice(productState.price);
      targetProduct.setQuantity(productState.quantity);
    }
  }

  isSavable(productState: ProductState) {
    const targetProduct = this.productCatalog.productList[productState.index];
    try {
      validateAllProductProps(productState.name, productState.price, productState.quantity);
      return true;
    } catch (err) {
      throw err;
    }
  }

  confirmEditProduct(tableRow: HTMLTableRowElement) {
    const productProp = tableRow.querySelectorAll('.product-prop');

    [...productProp].forEach((tableDatum) => {
      const productInputElement = tableDatum.firstChild;
      tableDatum.replaceChild(this.createProductSpanElement(tableDatum), productInputElement);
    });

    tableRow.id = `${tableRow.querySelector('.product-name').textContent}`;
  }

  createProductSpanElement(tableDatum: Element): HTMLSpanElement {
    const productSpanElement = document.createElement('span');
    productSpanElement.insertAdjacentHTML(
      'beforeend',
      `${(tableDatum.firstChild as HTMLInputElement).value}`
    );
    return productSpanElement;
  }

  toggleEditBtn(tableRow: HTMLTableRowElement) {
    [...tableRow.querySelector('.edit-button-container').children].forEach((btn) =>
      btn.classList.toggle('hide')
    );
  }
}
