import { MONEY_RULE } from '../../constants';
import MoneyManagement from '../../domain/MoneyManagement';
import { showSnackbar } from '../../utils';
import { $ } from '../../utils/dom';
import { validateNumber } from '../../utils/validator';

export default class MoneyChargeComponent {
  #moneyManagement: MoneyManagement;

  constructor(moneyManagement: MoneyManagement) {
    this.#moneyManagement = moneyManagement;
    $('.money-charge__form').addEventListener('submit', this.#submitHandler);
    $('.money-charge__input').focus();
  }

  #submitHandler = (e: Event) => {
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

    this.#moneyManagement.addMoney(money);

    $('.money-charge__total-money').textContent = String(
      this.#moneyManagement.money,
    );
  };
}
