import { CHARGE_MONEY } from '../constants/chargeMoney';
import { ERROR_MESSAGE } from '../constants/errorMessage';

export const checkValidConsumerChargeMoney = (money: number): void | never => {
  if (Number.isNaN(money)) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_CHARGE_MONEY);
  }

  if (
    money < CHARGE_MONEY.CONSUMER_MIN_CHARGE_MONEY ||
    money > CHARGE_MONEY.CONSUMER_MAX_CHARGE_MONEY
  ) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_CHARGE_MONEY);
  }

  if (money % CHARGE_MONEY.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.WRONG_UNIT_CHARGE_MONEY);
  }
};

export const checkCanSubtractConsumerChargeMoney = (
  consumerChargeMoney: number,
  productPrice: number
): void | never => {
  if (consumerChargeMoney < productPrice) {
    throw new Error(ERROR_MESSAGE.LACK_CHARGE_MONEY);
  }
};

export const checkCanReturnCoins = (
  consumerChargeMoney: number
): void | never => {
  if (consumerChargeMoney <= 0) {
    throw new Error(ERROR_MESSAGE.EMPTY_RETURN_COINS);
  }
};
