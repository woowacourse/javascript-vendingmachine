import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { $, addEvent, deleteSeparator, emit, markUnit } from '../utils';
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

    const products = storage.getLocalStorage('products');

    products.forEach((product) => this.insertItem(product));
  }

  template() {
    return TEMPLATE.PRODUCT_MANAGEMENT;
  }

  setEvent() {
    addEvent(this, 'submit', '.product-manage-form', (e: SubmitEvent & { target: HTMLFormElement }) =>
      this.handleAdd(e),
    );
    addEvent(this, 'click', '.product-item', (e: MouseEvent & { target: HTMLButtonElement }) =>
      this.handleUpdateAndDelete(e),
    );
    addEvent(this, 'submit', '.product-item__form', (e: SubmitEvent & { target: HTMLFormElement }) =>
      this.handleConfirm(e),
    );
  }

  handleAdd(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();

    const name = e.target.productName.value;
    const price = e.target.price.valueAsNumber;
    const quantity = e.target.quantity.valueAsNumber;

    emit('.product-manage-form', '@add', { name, price, quantity }, this);
  }

  handleUpdateAndDelete(e: MouseEvent & { target: HTMLButtonElement }) {
    if (e.target.classList.contains('product-item__edit-button')) {
      this.showForm(e);
    }

    if (e.target.classList.contains('product-item__delete-button') && confirm('해당 상품을 삭제하시겠습니까?')) {
      const productName = (e.target.closest('.product-item') as HTMLElement).dataset.productName;

      emit('#product-list-table', '@delete', { productName }, this);
    }
  }

  showForm(e: MouseEvent & { target: HTMLButtonElement }) {
    const productItem = e.target.closest('.product-item') as HTMLElement;
    const { productName, productId } = productItem.dataset;
    const values = [...productItem.getElementsByTagName('td')].slice(0, 3).map((td) => td.textContent);

    const name = values[0];
    const price = deleteSeparator(values[1]);
    const quantity = values[2];

    productItem.innerHTML = `
      <tr class="product-item" data-product-name="${productName}" data-product-id="${productId}">
        <td><form id="product-edit-form-${productName}" class="product-item__form"><input form="product-edit-form-${productName}" name="productName" maxlength="10" value="${name}" required/></form></td>
        <td><input type="number" form="product-edit-form-${productName}" name="price" min="100" max="10000" value="${price}" required/></td>
        <td><input type="number" form="product-edit-form-${productName}" name="quantity" min="1" max="20" value="${quantity}" required/></td>
        <td class="product-item__button">
          <button type="submit" class="product-item__confirm-button button" form="product-edit-form-${productName}">확인</button>
        </td>
      </tr>
    `;
  }

  handleConfirm(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();

    if (!e.submitter.classList.contains('product-item__confirm-button')) return;

    const targetName: string = (e.target.closest('.product-item') as HTMLElement).dataset.productName;
    const name: string = e.target.productName.value;
    const price: number = e.target.price.valueAsNumber;
    const quantity: number = e.target.quantity.valueAsNumber;

    emit('#product-list-table', '@update', { targetName, name, price, quantity }, this);
  }

  notify(action: string, _: never, product: Product) {
    if (action === 'add') {
      this.insertItem(product);
    }

    if (action === 'update') {
      this.updateItem(product);
    }

    if (action === 'delete') {
      this.deleteItem(product);
    }
  }

  insertItem(product: Product) {
    ($('.product-manage-form') as HTMLFormElement).reset();

    $('tbody', this).insertAdjacentHTML(
      'beforeend',
      `<tr class="product-item" data-product-name="${product.name}" data-product-id="${product.id}">
          <td>${product.name}</td>
          <td>${markUnit(product.price)}</td>
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
    const item = $(`[data-product-id="${product.id}"]`) as HTMLElement;

    item.dataset.productName = product.name;
    item.innerHTML = ` 
      <td>${product.name}</td>
      <td>${markUnit(product.price)}</td>
      <td>${product.quantity}</td>
      <td class="product-item__button">
        <button type="button" class="product-item__edit-button button">수정</button>
        <button type="button" class="product-item__delete-button button">삭제</button>
      </td>
    `;
  }

  deleteItem(product: Product) {
    $(`[data-product-id="${product.id}"]`).remove();
  }
}

customElements.define('product-management', ProductManagement);

export default ProductManagement;
