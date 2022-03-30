import { INPUT_MONEY_RULES, ALERT_MESSAGE } from '../constants';
import { Coin } from '../resource/declaration';

export const isValidMoney = (inputMoney: number, coins: Array<Coin>) => {
  if (
    inputMoney < INPUT_MONEY_RULES.MIN ||
    inputMoney % INPUT_MONEY_RULES.MOD_UNIT !== 0
  ) {
    alert(ALERT_MESSAGE.INPUT_MONEY);
    return false;
  }

  if (totalAmount(coins) + inputMoney > INPUT_MONEY_RULES.MAX) {
    alert(ALERT_MESSAGE.INPUT_MONEY_MAX);
    return false;
  }

  return true;
};

export const totalAmount = (coins: Array<Coin>) => {
  return coins.reduce((acc, { amount, count }) => acc + amount * count, 0);
};
