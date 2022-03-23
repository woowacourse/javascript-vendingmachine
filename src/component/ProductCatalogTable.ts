import { ProductCatalog } from '../domain/ProductCatalog';

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
      <div id='table-container'>
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

  tableBodyTemplate() {
    return this.productCatalog.productList
      .map((product) => this.tableRowTemplate(product))
      .join('');
  }

  tableRowTemplate(product) {
    return `<tr>
    <td name='${product.getName()}' class = 'product-name'><span>${product.getName()}</span></td>
    <td name='${product.getName()}' class = 'product-price'><span>${product.getPrice()}</span></td>
    <td name='${product.getName()}' class = 'product-quantity'><span>${product.getQuantity()}</span></td>
    <td class='edit-button-container'>
      <button class='edit-button' type='button'>수정</button>
      <button class='delete-button' type='button'>삭제</button>
      <button class='confirm-button hide' type='button'>확인</button>
   </td>
  <tr>`;
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

  isRerender() {
    return this.productTableBody !== undefined;
  }

  handleProductStateManage = (e) => {
    //수정버튼 일때
    if (e.target.classList.contains('edit-button')) {
      this.editProduct(e.target.parentNode.parentNode);
    }
    //삭제버튼 일때
    if (e.target.classList.contains('delete-button')) {
      //this.deleteProduct();
      console.log('delete-button');
    }
    //확인버튼 일때
    if (e.target.classList.contains('confirm-button')) {
      console.log('-1');
      this.confirmEditProduct(e.target.parentNode.parentNode);
    }
  };

  editProduct = (tableRow) => {
    const productName = tableRow.childNodes[1].innerText;
    const productTableData = document.querySelectorAll(`[name='${productName}']`);

    productTableData.forEach((tableDatum) => {
      const currentProductElement = tableDatum.firstChild;
      tableDatum.replaceChild(this.editProductTemplateElement(tableDatum), currentProductElement);
    });

    this.toggleEditBtn(tableRow);
  };

  editProductTemplateElement(tableDatum: Element) {
    const after = document.createElement('input');
    after.setAttribute(
      'type',
      `${tableDatum.classList.contains('product-name') ? 'text' : 'number'}`
    );
    //after.setAttribute('value', `${tableDatum.firstChild.textContent}`);
    console.log(after, 'after)');
    after.value = `${tableDatum.firstChild.textContent}`;
    return after;
  }

  toggleEditBtn(tableRow) {
    [...tableRow.querySelector('.edit-button-container').children].forEach((btn) =>
      btn.classList.toggle('hide')
    );
  }

  confirmEditProduct(tableRow) {
    console.log(tableRow.children[0].childNodes);

    const productName = tableRow.childNodes[1].firstChild.value;
    tableRow.childNodes[1].setAttribute('name', productName);
    tableRow.childNodes[1].setAttribute('value', productName);

    const productPrice = tableRow.childNodes[3].firstChild.value;
    tableRow.childNodes[3].setAttribute('name', productName);
    tableRow.childNodes[3].setAttribute('value', productPrice);

    const productQuantity = tableRow.childNodes[5].firstChild.value;
    tableRow.childNodes[5].setAttribute('name', productName);
    tableRow.childNodes[5].setAttribute('value', productQuantity);

    //변경된 domian으로 값 update
    const productTableData = document.querySelectorAll(`[name='${productName}']`);

    productTableData.forEach((tableDatum) => {
      const currentProductElement = tableDatum.firstChild;
      tableDatum.replaceChild(
        this.confirmedProductTemplateElement(tableDatum),
        currentProductElement
      );
    });
  }

  confirmedProductTemplateElement(tableDatum: Element) {
    const after = document.createElement('span');
    after.insertAdjacentHTML('beforeend', `${tableDatum.getAttribute('value')}`);
    return after;
  }
}
