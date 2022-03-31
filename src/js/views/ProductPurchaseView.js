import { $ } from '../utils/dom';
import { SECTION_CONTAINER } from '../constants/constants';
import { on, emit } from '../utils/event';
import { purchaseTableTemplate } from '../templates/templates';

export default class ProductPurchaseView {
  constructor() {
    on(SECTION_CONTAINER, [['submit', this.#onSubmitInputAmount]]);
  }

  #onSubmitInputAmount = (e) => {
    e.preventDefault();
    if (e.target.id !== 'purchase-form') return;

    const userAmount = this.$amountInput.valueAsNumber;
    emit(SECTION_CONTAINER, '@amount', { userAmount });
  };

  initPurchaseDOM() {
    this.$amountInput = $('#amount-input');
    this.$currentAmount = $('#current-amount');
    this.$purchaseTbody = $('#purchase-tbody');
    this.$fiveHundredCoinRemain = $('#five-hundred-coin-remain');
    this.$oneHundredCoinRemain = $('#one-hundred-coin-remain');
    this.$fiftyCoinRemain = $('#fifty-coin-remain');
    this.$tenCoinRemain = $('#ten-coin-remain');
  }

  renderAmount(userAmount) {
    this.$currentAmount.textContent = `투입한 금액: ${userAmount}원`;
  }

  render(productList) {
    if (Array.isArray(productList)) {
      productList.forEach((product) => {
        this.$purchaseTbody.insertAdjacentHTML('beforeend', purchaseTableTemplate(product));
      });
      return;
    }
    this.$purchaseTbody.insertAdjacentHTML('beforeend', purchaseTableTemplate(productList));
  }

  resetAmountInput() {
    this.$amountInput.value = '';
  }
}
