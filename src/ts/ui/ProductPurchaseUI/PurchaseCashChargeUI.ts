import { MESSAGE } from '../../constants';
import { showSnackbar } from '../../utils';
import { $ } from '../../utils/dom';

export default class PurchaseCashChargeUI {
  private purchaseCashDomain;

  constructor(purchaseCashDomain) {
    this.purchaseCashDomain = purchaseCashDomain;
    $('.purchase-cash-charge__form').addEventListener(
      'submit',
      this.submitHandler,
    );
    $('.purchase-cash-charge__input').focus();
  }

  private submitHandler = (e: Event) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const cashInput = e.target.elements.namedItem(
      'cashInput',
    ) as HTMLInputElement;
    const cash = cashInput.valueAsNumber;

    try {
      this.purchaseCashDomain.validateCashInput(cash);
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.purchaseCashDomain.addCash(cash);
    this.render();
    showSnackbar(MESSAGE.SUCCESS_CHARGE_PURCHASE_CASH);
  };

  render() {
    $('.purchase-cash-charge__total-cash').textContent =
      this.purchaseCashDomain.cash;
  }
}
