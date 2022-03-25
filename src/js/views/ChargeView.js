import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';

export default class ChargeView {
  constructor() {
    this.$sectionContainer = $('#section-container');

    on(this.$sectionContainer, 'submit', this.#onSubmitChargeAmount.bind(this));
  }

  initChargeDOM() {
    this.$fiveHundredCoin = $('#five-hundred-coin');
    this.$oneHundredCoin = $('#one-hundred-coin');
    this.$fiftyCoin = $('#fifty-coin');
    this.$tenCoin = $('#ten-coin');

    this.#bindChargeEvent();
  }

  #bindChargeEvent() {}

  #onSubmitChargeAmount(e) {
    e.preventDefault();
    console.log('coin');
    const amount = $('#charge-amount').value;
    emit(this.$sectionContainer, '@charge', { amount });
  }
}
