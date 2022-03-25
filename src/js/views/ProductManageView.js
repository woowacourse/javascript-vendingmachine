import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';
import { SECTION_CONTAINER, CONFIRM_DELETE_MESSAGE } from '../constants/constants.js';
import { tableTemplate, tableInputTemplate } from '../templates/templates.js';
import { validProductInfo } from '../utils/validation.js';

export default class ProductManageView {
  constructor() {
    on(SECTION_CONTAINER, 'submit', this.#onSubmitProductInfo.bind(this));
  }

  #bindMangeEvent() {
    this.$productTbody.addEventListener('click', (e) => {
      const { target } = e;

      if (target.classList.contains('modify-button')) {
        this.#modifyProductInfo(target.closest('tr'));
        return;
      }
      if (target.classList.contains('confirm-button')) {
        this.#confirmProductInfo(target.closest('tr'));
        return;
      }
      if (target.classList.contains('delete-button')) {
        if (window.confirm(CONFIRM_DELETE_MESSAGE)) {
          this.#deleteProductInfo(target.closest('tr'));
        }
      }
    });
  }

  #onSubmitProductInfo(e) {
    e.preventDefault();
    if (e.target.id !== 'product-add-form') return;

    const product = {
      name: this.$productNameInput.value,
      price: this.$productPriceInput.valueAsNumber,
      quantity: this.$productQuantityInput.valueAsNumber,
    };
    try {
      validProductInfo(product);
      emit(SECTION_CONTAINER, '@submit', { product });
    } catch (error) {
      alert(error.message);
    }
  }

  #modifyProductInfo(selectedProduct) {
    const product = {
      name: selectedProduct.children[0].textContent,
      price: selectedProduct.children[1].textContent,
      quantity: selectedProduct.children[2].textContent,
    };
    selectedProduct.replaceChildren();
    selectedProduct.insertAdjacentHTML('beforeend', tableInputTemplate(product));
  }

  #confirmProductInfo(selectedProduct) {
    const index = selectedProduct.rowIndex - 1;
    const product = {
      name: selectedProduct.children[0].firstChild.value,
      price: selectedProduct.children[1].firstChild.valueAsNumber,
      quantity: selectedProduct.children[2].firstChild.valueAsNumber,
    };
    try {
      validProductInfo(product);
      selectedProduct.replaceChildren();
      selectedProduct.insertAdjacentHTML('beforeend', tableTemplate(product));
      emit(SECTION_CONTAINER, '@modify', { index, product });
    } catch (error) {
      alert(error.message);
    }
  }

  #deleteProductInfo(selectedProduct) {
    const index = selectedProduct.rowIndex - 1;
    this.$productTbody.removeChild(selectedProduct);
    emit(SECTION_CONTAINER, '@delete', { index });
  }

  initManageDOM() {
    this.$productNameInput = $('#product-name-input');
    this.$productPriceInput = $('#product-price-input');
    this.$productQuantityInput = $('#product-quantity-input');
    this.$productTbody = $('#product-tbody');

    this.#bindMangeEvent();
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
}
