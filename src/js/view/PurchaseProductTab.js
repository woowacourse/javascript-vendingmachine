import { purchaseProductTabTemplate } from './template';

export default class PurchaseProductTab {
  #purchaseProductTabContainer;

  constructor() {
    this.#purchaseProductTabContainer = document.createElement('main');
    this.#purchaseProductTabContainer.insertAdjacentHTML(
      'beforeend',
      purchaseProductTabTemplate
    );
  }

  get tabElements() {
    return this.#purchaseProductTabContainer;
  }
}
