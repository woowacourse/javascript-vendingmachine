import Coin from '../models/Coin.ts';
import { on } from '../utils/event.js';
import { SECTION_CONTAINER } from '../constants/constants.js';
import ChargeView from '../views/ChargeView.js';

export default class Charge {
  constructor() {
    this.coin = new Coin();
    this.chargeView = new ChargeView();

    on(SECTION_CONTAINER, '@charge', this.#handleChargeCoin.bind(this));
  }

  #handleChargeCoin(e) {
    try {
      const { amount } = e.detail;
      this.coin.setAmount(amount);
      this.chargeView.renderCurrentAmount(this.coin.getAmount());
      this.chargeView.resetChargeInput();
      this.chargeView.renderHaveCoins(this.coin.getCoins());
    } catch (error) {
      alert(error.message);
    }
  }

  initCharge() {
    this.chargeView.initChargeDOM();
    this.chargeView.renderCurrentAmount(this.coin.getAmount());
    this.chargeView.renderHaveCoins(this.coin.getCoins());
  }
}
