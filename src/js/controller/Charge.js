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
      this.coinModel.makeRandomCoins(amount);
      const coins = this.coinModel.getCoins();
      this.chargeView.renderCoins(this.coinModel.getTotalAmount(coins), coins);
      this.chargeView.resetChargeInput();
    } catch (error) {
      alert(error.message);
    }
  }

  initCharge() {
    this.chargeView.initChargeDOM();
    const coins = this.coinModel.getCoins();
    this.chargeView.renderCoins(this.coinModel.getTotalAmount(coins), coins);
  }
}
