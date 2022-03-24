import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { $, addEvent, emit } from '../utils';
import VendingMachine from '../domain/VendingMachine';
import Product from '../domain/Product';
import storage from '../storage';
import { ELEMENT_KEY } from '../constants';

class ProductManagement extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    VendingMachine.instance.observe(ELEMENT_KEY.PRODUCT, this);
  }

  render() {
    this.innerHTML = this.template();

    const products = storage.getLocalStorage('products') ?? [];

    products.forEach((product) => this.insertItem(product));
  }

  template() {
    return TEMPLATE.PRODUCT_MANAGEMENT;
  }

  setEvent() {
    addEvent(this, 'submit', '.product-manage-form', (e: any) => this.handleAdd(e));
    addEvent(this, 'click', '.product-item', (e: any) => this.handleUpdateAndDelete(e));
    addEvent(this, 'submit', '.product-item__form', (e: any) => this.handleConfirm(e));
  }

  handleAdd(e: any) {
    e.preventDefault();

    const name = e.target.name.value;
    const price = e.target.price.valueAsNumber;
    const quantity = e.target.quantity.valueAsNumber;

    e.target.reset();

    emit('.product-manage-form', '@add', { name, price, quantity }, this);
  }

  handleUpdateAndDelete(e: any) {
    if (e.target.classList.contains('product-item__edit-button')) {
      this.showForm(e);
    }

    if (e.target.classList.contains('product-item__delete-button') && confirm('해당 상품을 삭제하시겠습니까?')) {
      const productName = e.target.closest('.product-item').dataset.productName;

      emit('#product-list-table', '@delete', { productName }, this);
    }
  }

  showForm(e: any) {
    const item = e.target.closest('.product-item');
    const values = [...item.getElementsByTagName('td')].slice(0, 3).map((td) => td.textContent);

    item.innerHTML = `
      <tr class="product-item" data-product-name="${item.dataset.productName}">
        <td><form id="product-edit-form-${item.dataset.productName}" class="product-item__form"><input form="product-edit-form-${item.dataset.productName}" name="name" maxlength="10" value="${values[0]}" required/></form></td>
        <td><input type="number" form="product-edit-form-${item.dataset.productName}" name="price" min="100" max="10000" value="${values[1]}" required/></td>
        <td><input type="number" form="product-edit-form-${item.dataset.productName}" name="quantity" min="1" max="20" value="${values[2]}" required/></td>
        <td class="product-item__button">
          <button type="submit" class="product-item__confirm-button button" form="product-edit-form-${item.dataset.productName}">확인</button>
        </td>
      </tr>
    `;
  }

  handleConfirm(e: any) {
    e.preventDefault();

    if (!e.submitter.classList.contains('product-item__confirm-button')) return;

    const targetName: string = e.target.closest('.product-item').dataset.productName;
    const name: string = e.target.name.value;
    const price: number = e.target.price.valueAsNumber;
    const quantity: number = e.target.quantity.valueAsNumber;

    emit('#product-list-table', '@update', { targetName, name, price, quantity }, this);
  }

  notify(action: string, _: never, product: Product) {
    if (action === 'add') {
      this.insertItem(product);
      return;
    }

    if (action === 'update') {
      this.updateItem(product);
    }

    if (action === 'delete') {
      this.deleteItem(product);
    }
  }

  insertItem(product: Product) {
    $('tbody', this).insertAdjacentHTML(
      'beforeend',
      `<tr class="product-item" data-product-name="${product.name}">
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.quantity}</td>
          <td class="product-item__button">
            <button type="button" class="product-item__edit-button button">수정</button>
            <button type="button" class="product-item__delete-button button">삭제</button>
          </td>
       </tr>
      `,
    );
  }

  updateItem(product: Product) {
    $(`[data-product-name="${product.name}"]`).innerHTML = `  
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td class="product-item__button">
        <button type="button" class="product-item__edit-button button">수정</button>
        <button type="button" class="product-item__delete-button button">삭제</button>
      </td>
    `;
  }

  deleteItem(product: Product) {
    $(`[data-product-name="${product.name}"]`).remove();
  }
}

customElements.define('product-management', ProductManagement);

export default ProductManagement;
