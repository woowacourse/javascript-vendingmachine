import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

const tableTemplate = (product) => {
  return `
    <tr>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.quantity}</td>
      <td><button type="button">수정</button> <button type="button">삭제</button></td>
    </tr>
  `;
};

export default class ProductManageView {
  constructor() {
    this.$sectionContainer = $('#section__container');

    on(this.$sectionContainer, 'submit', this.#getProductInformation.bind(this));
    on(this.$sectionContainer, '@select', this.#selectProductDOM.bind(this));
  }

  #selectProductDOM() {
    this.$productNameInput = $('#product__name-input');
    this.$productPriceInput = $('#product__price-input');
    this.$productQuantityInput = $('#product__quantity-input');
  }

  #getProductInformation(e) {
    e.preventDefault();
    if (e.target.id !== 'product__add-form') return;
    const keyword = {
      name: this.$productNameInput.value,
      price: this.$productPriceInput.valueAsNumber,
      quantity: this.$productQuantityInput.valueAsNumber,
    };
    emit(this.$sectionContainer, '@submit', { keyword });
  }

  renderTable(product) {
    $('#product__tbody').insertAdjacentHTML('beforeend', tableTemplate(product));
  }

  resetProductInput() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
    this.$productQuantityInput.value = '';
  }
}
