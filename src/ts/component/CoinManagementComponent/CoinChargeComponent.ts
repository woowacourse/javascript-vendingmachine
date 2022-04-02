import { CASH_RULE } from '../../constants';
import { $ } from '../../utils/dom';
import { validateNumber } from '../../utils/validator';
import { viewPainter } from '../ViewPainter';

export default class CoinChargeComponent {
  private coinManagement;

  constructor(coinManagement) {
    this.coinManagement = coinManagement;
    $('.coin-charge__form').addEventListener('submit', this.submitHandler);
    $('.coin-charge__input').focus();
  }

  private submitHandler = (e: Event) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const cashInput = e.target.elements.namedItem(
      'cashInput',
    ) as HTMLInputElement;
    const cash = cashInput.valueAsNumber;

    try {
      validateNumber(cash, CASH_RULE);
    } catch ({ message }) {
      alert(message);
      return;
    }

    this.coinManagement.addCash(cash);

    $('.coin-charge__total-cash').textContent = this.coinManagement.totalCash;
    viewPainter.renderCoins();
  };
}
