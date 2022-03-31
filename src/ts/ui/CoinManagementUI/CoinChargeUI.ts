import { MESSAGE } from '../../constants';
import { showSnackbar } from '../../utils';
import { $ } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

export default class CoinChargeUI {
  private coinDomain;

  constructor(coinDomain) {
    this.coinDomain = coinDomain;
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
      this.coinDomain.validateCashInput(cash);
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.coinDomain.addCash(cash);

    $('.coin-charge__total-cash').textContent = this.coinDomain.totalCash;
    viewPainter.renderCoins();
    showSnackbar(MESSAGE.SUCCESS_CHARGE_CASH);
  };
}
