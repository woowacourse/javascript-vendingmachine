import { on } from '../utils/event.js';
import { SECTION_CONTAINER } from '../constants/constants.js';
import ChargeView from '../views/ChargeView.js';

export default class Charge {
  constructor(coin) {
    this.coinModel = coin;
    this.chargeView = new ChargeView();

    on(SECTION_CONTAINER, '@charge', this.#handleChargeCoin.bind(this));
  }

  #handleChargeCoin(e) {
    try {
      const { amount } = e.detail;
      this.coinModel.setAmount(amount);
      this.chargeView.renderCurrentAmount(this.coinModel.getAmount());
      this.chargeView.resetChargeInput();
      this.chargeView.renderHaveCoins(this.coinModel.getCoins());
    } catch (error) {
      alert(error.message);
    }
  }

  initCharge() {
    this.chargeView.initChargeDOM();
    this.chargeView.renderCurrentAmount(this.coinModel.getAmount());
    this.chargeView.renderHaveCoins(this.coinModel.getCoins());
  }
}
