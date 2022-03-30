import { Coins } from '../types/vendingMachineChargeMoneyManager';

import { ERROR_MESSAGE } from '../constants/errorMessage';
import { CHARGE_MONEY } from '../constants/chargeMoney';

export const checkValidChargeMoney = (money: number): void => {
  if (Number.isNaN(money)) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  }

  if (money % CHARGE_MONEY.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  }
};

export const checkCanAddMoney = (
  currentMoney: number,
  coinList: Coins
): void => {
  const totalMoney: number = Object.entries(coinList).reduce(
    (sum: number, [coin, count]: [string, number]) =>
      sum + Number(coin.replace('COIN_', '')) * count,
    currentMoney
  );

  if (totalMoney > CHARGE_MONEY.MAX_TOTAL_CHARGE_MONEY) {
    throw new Error(ERROR_MESSAGE.OVERFLOW_CHARGE_MONEY(currentMoney));
  }
};
