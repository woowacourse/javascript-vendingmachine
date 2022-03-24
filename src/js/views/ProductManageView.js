import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

export default class ProductManageView {
  constructor() {
    this.$sectionContainer = $('#section__container');

    on(this.$sectionContainer, 'submit', this.#getProductInformation.bind(this));
  }

  #getProductInformation(e) {
    e.preventDefault();
    if (e.target.id !== 'product__add-form') return;
    const keyword = {
      name: $('#product__name-input').value,
      price: $('#product__price-input').valueAsNumber,
      quantity: $('#product__quantity-input').valueAsNumber,
    };

    // const name = $('#product__name-input').value;
    // const price = $('#product__price-input').valueAsNumber;
    // const quantity = $('#product__quantity-input').valueAsNumber;

    emit(this.$sectionContainer, '@submit', { keyword });
  }

  // #renderTable {

  // }
}
