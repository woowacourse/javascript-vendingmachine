import { generateRandomCoins, checkValidChargeMoney } from '../../utils/utils';
import { emit, renderSnackBar, $, on } from '../../dom';

export default class ChargeMoneyComponent {
  private $coinInput = $(
    '.charge-form-section__coin-input'
  ) as HTMLInputElement;
  private $chargeButton = $(
    '.charge-form-section__button'
  ) as HTMLButtonElement;
  private $totalCoin: HTMLElement = $('.charge-form-section__total-coin');
  private $snackBarContainer: HTMLElement = $('.snack-bar-container');

  constructor(private vendingMachineCoinManager) {
    on(this.$chargeButton, 'click', this.onSubmitChargeButton);
  }

  private onSubmitChargeButton = (e: Event): void => {
    e.preventDefault();

    try {
      checkValidChargeMoney(this.$coinInput.valueAsNumber);
      this.vendingMachineCoinManager.addCoins(
        generateRandomCoins(this.$coinInput.valueAsNumber)
      );

      this.$totalCoin.textContent =
        this.vendingMachineCoinManager.getTotalAmount();

      emit(this.$chargeButton, '@chargeInputSubmit', {
        detail: {
          coins: this.vendingMachineCoinManager.getCoins(),
        },
      });

      this.$coinInput.value = '';
      this.$coinInput.focus();
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message);
    }
  };
}
