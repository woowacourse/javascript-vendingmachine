import { Coins } from '../../types/vendingMachineChargeMoneyManager';

import { checkValidChargeMoney } from '../../validation/checkChargeMoney';
import pickRandomIndex from '../../utils/utils';

import { COINS } from '../../constants/chargeMoney';

import { emit, $, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';

const generateRandomCoins = (money: number): Coins => {
  const coinList: number[] = COINS.INITIAL_LIST;
  const coinsQuantity: Coins = { ...COINS.INITIAL_QUANTITY_STATE };

  let remainMoney: number = money;

  while (remainMoney) {
    const pickableCoins: number[] = coinList.filter(
      (coin: number) => coin <= remainMoney
    );
    const pickedCoin: number =
      pickableCoins[pickRandomIndex(0, pickableCoins.length - 1)];
    coinsQuantity[`QUANTITY_COIN_${pickedCoin}`] += 1;
    remainMoney -= pickedCoin;
  }

  return coinsQuantity;
};

export default class ChargeMoneyInputComponent {
  private $chargeMoneyInput = $(
    '.charge-form-section__charge-money-input'
  ) as HTMLInputElement;
  private $chargeButton = $(
    '.charge-form-section__button'
  ) as HTMLButtonElement;
  private $totalChargeMoney: HTMLElement = $(
    '.charge-form-section__total-charge-money'
  );
  private $snackBarContainer: HTMLElement = $('.snack-bar-container');

  constructor(private vendingMachineChargeMoneyManager) {
    on(this.$chargeButton, 'click', this.onSubmitChargeButton);
  }

  private onSubmitChargeButton = (event: Event): void => {
    event.preventDefault();

    try {
      const chargeMoney = this.$chargeMoneyInput.valueAsNumber;

      checkValidChargeMoney(chargeMoney);
      this.vendingMachineChargeMoneyManager.addCoins(
        generateRandomCoins(chargeMoney)
      );

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
