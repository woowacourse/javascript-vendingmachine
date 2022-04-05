import { MONEY_RULE } from '../../constants';
import { showSnackbar } from '../../utils';
import { $ } from '../../utils/dom';
import { validateNumber } from '../../utils/validator';

export default class MoneyChargeComponent {
  private moneyManagement;

  constructor(moneyManagement) {
    this.moneyManagement = moneyManagement;
    $('.money-charge__form').addEventListener('submit', this.submitHandler);
    $('.money-charge__input').focus();
  }

  private submitHandler = (e: Event) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const moneyInput = e.target.elements.namedItem(
      'moneyInput',
    ) as HTMLInputElement;
    const money = moneyInput.valueAsNumber;

    try {
      validateNumber(money, MONEY_RULE);
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.moneyManagement.addMoney(money);

    $('.money-charge__total-money').textContent = this.moneyManagement.money;
  };
}
