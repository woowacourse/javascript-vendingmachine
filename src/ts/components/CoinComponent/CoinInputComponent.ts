import { COINS } from '../../constants';
import { $ } from '../../dom';
import { emit, on } from '../../events';
import renderSnackBar from '../../snackbar';
import { Coins } from '../../types/CoinManager';
import { pickRandomIndex } from '../../utils';
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
  private $chargeForm = $('.charge-form-section__form');
  private $totalCoin: HTMLElement = $('.charge-form-section__total-coin');

  constructor(private vendingMachineCoinManager) {
    on(this.$chargeForm, 'submit', this.onSubmitChargeButton);
  }

  private onSubmitChargeButton = (e: Event): void => {
    e.preventDefault();

    try {
      checkValidChargeMoney(this.$coinInput.valueAsNumber);
      this.vendingMachineCoinManager.addCoins(
        generateRandomCoins(this.$coinInput.valueAsNumber)
      );

      this.renderTotalCoins();

      emit(this.$chargeForm, '@chargeInputSubmit', {
        detail: {
          coins: this.vendingMachineCoinManager.getCoins(),
        },
      });

      this.$coinInput.value = '';
      this.$coinInput.focus();
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };

  renderTotalCoins() {
    this.$totalCoin.textContent =
      this.vendingMachineCoinManager.getTotalAmount();
  }
}
