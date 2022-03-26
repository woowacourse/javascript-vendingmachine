import { createMainElement } from '../utils/dom';
import { purchaseTemplate } from './template';

export default class PurchaseProductTab {
  #purchaseContainer;

  constructor() {
    this.#purchaseContainer = createMainElement(purchaseTemplate);
  }

  get tabElements() {
    return this.#purchaseContainer;
  }
}
