import { templateA } from './template';

export default class ProductManageTab {
  #manageTabContainer;
  #addProductForm;
  #productNameInput;
  #productPriceInput;
  #productStockInput;

  constructor() {
    this.#manageTabContainer = document.createElement('main');
    this.#manageTabContainer.insertAdjacentHTML('beforeend', templateA);
    this.#addProductForm =
      this.#manageTabContainer.querySelector('#add-product-form');
    this.#productNameInput =
      this.#manageTabContainer.querySelector('#product-name');
    this.#productPriceInput =
      this.#manageTabContainer.querySelector('#product-price');
    this.#productStockInput =
      this.#manageTabContainer.querySelector('#product-stock');
  }

  get tabElements() {
    return this.#manageTabContainer;
  }
}
