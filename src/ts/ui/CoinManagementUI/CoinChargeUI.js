import { $ } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

export default class ProductAdditionUI {
  constructor(coinDomain) {
    this.$form = $('.coin-charge__form');
    this.$totalCash = $('.coin-charge__total-cash');
    this.coinDomain = coinDomain;
    this.addSubmitEvent();
  }

  addSubmitEvent() {
    this.$form.addEventListener('submit', e => {
      e.preventDefault();
      const cash = e.target.elements.cashInput.valueAsNumber;
      this.coinDomain.addCash(cash);

      this.$totalCash.textContent = this.coinDomain.totalCash;
      viewPainter.renderCoins();
    });
  }
}
