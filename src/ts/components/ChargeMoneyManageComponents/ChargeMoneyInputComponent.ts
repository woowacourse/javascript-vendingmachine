import { Coins } from '../../types/vendingMachineChargeMoneyManager';

import { checkValidChargeMoney } from '../../validation/checkChargeMoney';
import { checkCanAddMoney } from '../../validation/checkChargeMoney';

import { COINS } from '../../constants/chargeMoney';
import pickRandomIndex from '../../utils/utils';

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
  private $chargeMoneyInput = $<HTMLInputElement>(
    '.charge-form-section__charge-money-input'
  );
  private $chargeButton = $<HTMLButtonElement>('.charge-form-section__button');
  private $totalChargeMoney = $<HTMLElement>(
    '.charge-form-section__total-charge-money'
  );
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');

  constructor(private vendingMachineChargeMoneyManager) {
    on(this.$chargeButton, 'click', this.onClickChargeButton);

    on(
      $<HTMLButtonElement>('.return-coin-quantity-section__return-button'),
      '@replaceTotalChargeMoney',
      this.replaceTotalChargeMoney
    );
  }

  private replaceTotalChargeMoney = () => {
    this.$totalChargeMoney.textContent =
      this.vendingMachineChargeMoneyManager.getTotalAmount();
  };

  private onClickChargeButton = (event: Event): void => {
    event.preventDefault();

    try {
      const chargeMoney = this.$chargeMoneyInput.valueAsNumber;
      checkValidChargeMoney(chargeMoney);

      const newCoinsQuantity = generateRandomCoins(chargeMoney);
      checkCanAddMoney(
        this.vendingMachineChargeMoneyManager.getTotalAmount(),
        newCoinsQuantity
      );

      this.vendingMachineChargeMoneyManager.addCoins(newCoinsQuantity);

      this.$totalChargeMoney.textContent =
        this.vendingMachineChargeMoneyManager.getTotalAmount();
      this.$chargeMoneyInput.value = '';
      this.$chargeMoneyInput.focus();

      renderSnackBar(
        this.$snackBarContainer,
        `${chargeMoney}원이 충전 되었습니다. 충전된 잔돈을 확인해주세요.`,
        'success'
      );

      emit(this.$chargeButton, '@chargeInputSubmit', {
        detail: {
          coins: this.vendingMachineChargeMoneyManager.getCoins(),
        },
      });
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
