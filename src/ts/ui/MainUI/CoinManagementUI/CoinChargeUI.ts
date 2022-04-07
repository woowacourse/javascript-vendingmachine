import CoinManagementDomain from '../../../domain/CoinManagementDomain/CoinManagement';
import { validateCash } from '../../../domain/CoinManagementDomain/validator';
import { VENDING_MACHINE_MESSAGE } from '../../../constants/message';
import { showSnackbar } from '../../../utils';
import { $ } from '../../../utils/dom';
import { viewPainter } from '../../ViewPainter';

export default class CoinChargeUI {
  private readonly coinDomain: CoinManagementDomain;

  constructor(coinDomain: CoinManagementDomain) {
    this.coinDomain = coinDomain;
    $('.coin-charge__form').addEventListener('submit', this.submitHandler);
    $('.coin-charge__input').focus();
  }

  private submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const cashInput = e.target.elements.namedItem(
      'cashInput',
    ) as HTMLInputElement;
    const cash = cashInput.valueAsNumber;

    try {
      validateCash(cash);
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.coinDomain.addCash(cash);

    $('.coin-charge__total-cash').textContent =
      this.coinDomain.totalCash.toString();
    viewPainter.renderCoins();
    showSnackbar(VENDING_MACHINE_MESSAGE.SUCCESS_CHARGE_CASH);
  };
}
