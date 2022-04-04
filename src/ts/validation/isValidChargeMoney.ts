import { CHARGE_MONEY_RULES, ALERT_MESSAGE } from '../constants';
import { Coin } from '../resource/declaration';

export const isValidChargeMoney = (inputMoney: number, coins: Array<Coin>) => {
  if (
    inputMoney < CHARGE_MONEY_RULES.MIN ||
    inputMoney % CHARGE_MONEY_RULES.MOD_UNIT !== 0
  ) {
    alert(ALERT_MESSAGE.CHARGE_MONEY);
    return false;
  }

  if (totalAmount(coins) + inputMoney > CHARGE_MONEY_RULES.MAX) {
    alert(ALERT_MESSAGE.CHARGE_MONEY_MAX);
    return false;
  }

  return true;
};

export const totalAmount = (coins: Array<Coin>) => {
  return coins.reduce((acc, { amount, count }) => acc + amount * count, 0);
};
