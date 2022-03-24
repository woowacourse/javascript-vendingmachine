import {
  generateRandomCoins,
  checkValidChargeMoney,
} from '../../../utils/utils';
import { emit } from '../../dom';

export default class CoinInputComponent {
  $coinInput: HTMLInputElement = document.querySelector(
    '.charge-form-section__coin-input'
  );
  $chargeButton: HTMLButtonElement = document.querySelector(
    '.charge-form-section__button'
  );
  $totalCoin: HTMLElement = document.querySelector(
    '.charge-form-section__total-coin'
  );

  constructor(private vendingMachineCoinManager) {
    this.$chargeButton.addEventListener('click', this.onSubmitChargeButton);
  }

  onSubmitChargeButton = (e) => {
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
    } catch (error) {
      console.log(error);
    }
  };
}
