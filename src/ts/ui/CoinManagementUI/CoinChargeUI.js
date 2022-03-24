import { $ } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';
import { validateCash } from './validator';

export default class CoinChargeUI {
  constructor(coinDomain) {
    this.coinDomain = coinDomain;
    this.addSubmitEvent();
  }

  addSubmitEvent() {
    $('.coin-charge__form').addEventListener('submit', e => {
      e.preventDefault();
      const cash = e.target.elements.cashInput.valueAsNumber;

      try {
        validateCash(cash);
      } catch ({ message }) {
        alert(message);
        return;
      }

      this.coinDomain.addCash(cash);

      $('.coin-charge__total-cash').textContent = this.coinDomain.totalCash;
      viewPainter.renderCoins();
    });
  }
}
