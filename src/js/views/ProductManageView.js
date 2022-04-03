import { SECTION_CONTAINER, CONFIRM_DELETE_MESSAGE } from '../constants/constants.js';
import { $, replaceElement } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

const tableTemplate = ({ name, price, quantity }) => {
  return `
    <tr>
      <td>${name}</td>
      <td>${price}</td>
      <td>${quantity}</td>
      <td>
        <button class="modify-button" type="button" data-name=${name} data-price=${price} data-quantity=${quantity}>수정</button>
        <button class="delete-button" type="button">삭제</button>
      </td>
    </tr>
  `;
};

const tableInputTemplate = ({ name, price, quantity }) => {
  return `
    <td><input id="modify-name" type="text" class="modify-input" placeholder="상품명" value=${name} /></td>
    <td><input id="modify-price" type="number" min="100" max="10000" step="10" class="modify-input" placeholder="가격" value=${price} /></td>
    <td><input id="modify-quantity" type="number" min="1" max="20" class="modify-input" placeholder="수량" value=${quantity} /></td>
    <td><button class="confirm-button" type="button">확인</button></td>
  `;
};

export default class ProductManageView {
  constructor() {
    this.$productNameInput = '';
    this.$productPriceInput = '';
    this.$productQuantityInput = '';
    this.$productTbody = '';

    on(SECTION_CONTAINER, 'submit', this.#onSubmitProductInfo.bind(this));
  }

  initManageDOM() {
    this.$productNameInput = $('#product-name-input');
    this.$productPriceInput = $('#product-price-input');
    this.$productQuantityInput = $('#product-quantity-input');
    this.$productTbody = $('#product-tbody');

    this.#bindMangeEvent();
  }

  renderModifiedProduct(index, product) {
    replaceElement(this.$productTbody.children[index], tableTemplate(product));
  }

  render(productList) {
    if (Array.isArray(productList)) {
      productList.forEach((product) => {
        this.$productTbody.insertAdjacentHTML('beforeend', tableTemplate(product));
      });
      return;
    }
    this.$productTbody.insertAdjacentHTML('beforeend', tableTemplate(productList));
  }

  resetProductInput() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
    this.$productQuantityInput.value = '';
  }

  #bindMangeEvent() {
    this.$productTbody.addEventListener('click', (e) => {
      const { className } = e.target;

      switch (className) {
        case 'modify-button':
          this.#modifyProductInfo(e.target);
          break;
        case 'confirm-button':
          this.#confirmProductInfo(e.target.closest('tr'));
          break;
        case 'delete-button':
          if (window.confirm(CONFIRM_DELETE_MESSAGE)) {
            this.#deleteProductInfo(e.target.closest('tr'));
          }
          break;
        default:
      }
    });
  }

  #onSubmitProductInfo(e) {
    e.preventDefault();
    if (e.target.id !== 'product-add-form') return;

    const product = {
      name: this.$productNameInput.value.trim(),
      price: this.$productPriceInput.valueAsNumber,
      quantity: this.$productQuantityInput.valueAsNumber,
    };
    emit(SECTION_CONTAINER, '@manage', { product });
  }

  #modifyProductInfo(selectedProductButton) {
    const product = {
      name: selectedProductButton.dataset.name,
      price: selectedProductButton.dataset.price,
      quantity: selectedProductButton.dataset.quantity,
    };
    replaceElement(selectedProductButton.closest('tr'), tableInputTemplate(product));
  }

  #confirmProductInfo(selectedProduct) {
    const index = selectedProduct.rowIndex - 1;
    const product = {
      name: selectedProduct.querySelector('#modify-name').value.trim(),
      price: selectedProduct.querySelector('#modify-price').valueAsNumber,
      quantity: selectedProduct.querySelector('#modify-quantity').valueAsNumber,
    };
    emit(SECTION_CONTAINER, '@modify', { index, product });
  }

  #deleteProductInfo(selectedProduct) {
    const index = selectedProduct.rowIndex - 1;
    this.$productTbody.removeChild(selectedProduct);
    emit(SECTION_CONTAINER, '@delete', { index });
  }
}
