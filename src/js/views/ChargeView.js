import { $ } from '../utils/dom.js';
import { on, emit } from '../utils/event.js';
import { validChargeCoinUnit } from '../utils/validation.js';
import { SECTION_CONTAINER } from '../constants/constants.js';

export default class ChargeView {
  constructor() {
    on(SECTION_CONTAINER, 'submit', this.#onSubmitChargeAmount.bind(this));
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
    if (e.target.id !== 'charge-form') return;

    const amount = $('#charge-amount').value;
    try {
      validChargeCoinUnit(amount);
      emit(this.$sectionContainer, '@charge', { amount });
    } catch (error) {
      alert(error.message);
    }
  }
}
