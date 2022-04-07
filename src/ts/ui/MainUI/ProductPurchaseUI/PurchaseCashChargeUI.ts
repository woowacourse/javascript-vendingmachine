import PurchaseCashDomain from '../../../domain/PurchaseCashDomain/PurchaseCash';
import { validatePurchaseCash } from '../../../domain/PurchaseCashDomain/validator';
import { VENDING_MACHINE_MESSAGE } from '../../../constants/message';
import { showSnackbar } from '../../../utils';
import { $ } from '../../../utils/dom';

export default class PurchaseCashChargeUI {
  private readonly purchaseCashDomain: PurchaseCashDomain;

  constructor(purchaseCashDomain: PurchaseCashDomain) {
    this.purchaseCashDomain = purchaseCashDomain;
    $('.purchase-cash-charge__form').addEventListener(
      'submit',
      this.submitHandler,
    );
    $('.purchase-cash-charge__input').focus();
  }

  private submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const cashInput = e.target.elements.namedItem(
      'cashInput',
    ) as HTMLInputElement;
    const cash = cashInput.valueAsNumber;

    try {
      validatePurchaseCash(cash);
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.purchaseCashDomain.addCash(cash);
    this.render();
    showSnackbar(VENDING_MACHINE_MESSAGE.SUCCESS_CHARGE_PURCHASE_CASH);
  };

  render() {
    $('.purchase-cash-charge__total-cash').textContent =
      this.purchaseCashDomain.cash.toString();
  }
}
