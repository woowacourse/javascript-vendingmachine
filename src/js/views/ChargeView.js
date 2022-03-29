import { SECTION_CONTAINER } from '../constants/constants.js';
import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

export default class ChargeView {
  constructor() {
    on(SECTION_CONTAINER, [['submit', this.#onSubmitChargeAmount]]);
  }

  #onSubmitChargeAmount = (e) => {
    e.preventDefault();
    if (e.target.id !== 'charge-form') return;

    const amount = this.$chargeAmountInput.valueAsNumber;
    emit(SECTION_CONTAINER, '@charge', { amount });
  };

  initChargeDOM() {
    this.$chargeAmountInput = $('#charge-amount-input');
    this.$currentAmount = $('.current-amount');
    this.$fiveHundredCoin = $('#five-hundred-coin');
    this.$oneHundredCoin = $('#one-hundred-coin');
    this.$fiftyCoin = $('#fifty-coin');
    this.$tenCoin = $('#ten-coin');
  }

  renderHaveCoins(coins) {
    this.$fiveHundredCoin.innerText = `${coins[500]}개`;
    this.$oneHundredCoin.innerText = `${coins[100]}개`;
    this.$fiftyCoin.innerText = `${coins[50]}개`;
    this.$tenCoin.innerText = `${coins[10]}개`;
  }

  renderCurrentAmount(amount) {
    this.$currentAmount.innerText = `현재 보유 금액: ${amount}원`;
  }

  resetChargeInput() {
    this.$chargeAmountInput.value = '';
  }
}
