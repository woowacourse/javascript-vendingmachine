import { createMainElement } from '../utils/dom';
import { TEMPLATE } from './template';

export default class PurchaseProductTab {
  #purchaseContainer;

  constructor() {
    this.#purchaseContainer = createMainElement(TEMPLATE.PURCHASE);
  }

  get tabElements() {
    return this.#purchaseContainer;
  }
}
