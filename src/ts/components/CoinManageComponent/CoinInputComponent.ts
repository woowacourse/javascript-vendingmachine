import { COINS } from '../../constants';
import { $ } from '../../dom';
import renderSnackBar from '../../snakbar';
import { Coins } from '../../types/vendingMachineCoinManager';
import { emit, on, pickRandomIndex } from '../../utils';
import { checkValidChargeMoney } from '../validator';

const generateRandomCoins = (money: number): Coins => {
  const coinList: number[] = COINS.LIST;
  const coinsObject: Coins = { ...COINS.INITIAL_STATE };

  let remainMoney: number = money;

  while (remainMoney) {
    const pickableCoins: number[] = coinList.filter(
      (coin: number) => coin <= remainMoney
    );
    const pickedCoin: number =
      pickableCoins[pickRandomIndex(0, pickableCoins.length - 1)];
    coinsObject[`COIN_${pickedCoin}`] += 1;
    remainMoney -= pickedCoin;
  }

  return coinsObject;
};

export default class CoinInputComponent {
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
