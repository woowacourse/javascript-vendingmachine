import { templateC } from './template';

export default class PurchaseProductTab {
  #purchaseProductTabContainer;

  constructor() {
    this.#purchaseProductTabContainer = document.createElement('main');
    this.#purchaseProductTabContainer.insertAdjacentHTML(
      'beforeend',
      templateC
    );
  }

  get tabElements() {
    return this.#purchaseProductTabContainer;
  }
}
