import { checkValidChargeMoney } from '../../validation/checkChargeMoney';

import { emit, $, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';

export default class ChargeMoneyInputComponent {
  private $chargeMoneyInput = $<HTMLInputElement>(
    '.charge-form-section__charge-money-input'
  );
  private $chargeButton = $<HTMLButtonElement>('.charge-form-section__button');
  private $totalChargeMoney = $<HTMLElement>(
    '.charge-form-section__total-charge-money'
  );
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');

  constructor(private vendingMachineChargeMoneyManager) {
    on(this.$chargeButton, 'click', this.onSubmitChargeButton);
  }

  private onSubmitChargeButton = (event: Event): void => {
    event.preventDefault();

    try {
      const chargeMoney = this.$chargeMoneyInput.valueAsNumber;

      checkValidChargeMoney(chargeMoney);
      this.vendingMachineChargeMoneyManager.addCoins(chargeMoney);

      this.$totalChargeMoney.textContent =
        this.vendingMachineChargeMoneyManager.getTotalAmount();

      this.$chargeMoneyInput.value = '';
      this.$chargeMoneyInput.focus();

      emit(this.$chargeButton, '@chargeInputSubmit', {
        detail: {
          coins: this.vendingMachineChargeMoneyManager.getCoins(),
        },
      });
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message);
    }
  };
}
