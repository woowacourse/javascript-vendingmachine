import ProductPurchaseView from '../views/ProductPurchaseView.js';
import { on } from '../utils/event.js';
import { SECTION_CONTAINER } from '../constants/constants.js';

export default class ProductPurchase {
  constructor() {
    this.productPurchaseView = new ProductPurchaseView();

    on(SECTION_CONTAINER, '@purchase', this.#handlePurchaseAmount.bind(this));
  }

  initPurchase() {
    this.productPurchaseView.initPurchaseDom();
  }

  #handlePurchaseAmount(e) {
    const { inputAmount } = e.detail;
  }
}
