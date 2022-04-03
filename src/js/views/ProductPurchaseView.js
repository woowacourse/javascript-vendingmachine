import { SECTION_CONTAINER } from '../constants/constants.js';
import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

export default class ProductPurchaseView {
  constructor() {
    on(SECTION_CONTAINER, 'submit', this.#onSubmitPurchaseAmount.bind(this));
  }

  initPurchaseDom() {
    this.$productPurchaseInput = $('#product-purchase-input');
  }

  #onSubmitPurchaseAmount(e) {
    e.preventDefault();
    if (e.target.id !== 'purchase-form') return;

    const inputAmount = this.$productPurchaseInput.valueAsNumber;
    emit(SECTION_CONTAINER, '@purchase', { inputAmount });
  }
}
