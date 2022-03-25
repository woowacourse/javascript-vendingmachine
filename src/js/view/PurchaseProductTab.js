import { purchaseTemplate } from './template';

export default class PurchaseProductTab {
  #purchaseContainer;

  constructor() {
    this.#purchaseContainer = document.createElement('main');
    this.#purchaseContainer.insertAdjacentHTML('beforeend', purchaseTemplate);
  }

  get tabElements() {
    return this.#purchaseContainer;
  }
}
