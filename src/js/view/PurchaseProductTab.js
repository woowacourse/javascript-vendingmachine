import { createMainElement } from '../utils/dom';
import { purchaseTabTemplate } from './template';

export default class PurchaseProductTab {
  #purchaseContainer;

  constructor() {
    this.#purchaseContainer = createMainElement(purchaseTabTemplate);
  }

  get tabElements() {
    return this.#purchaseContainer;
  }
}
