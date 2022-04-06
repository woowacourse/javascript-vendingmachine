import { ERROR_MESSAGE } from '../constants/errorMessage';

export const checkValidConsumerChargeMoney = (money: number): void | never => {
  if (Number.isNaN(money)) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_CHARGE_MONEY);
  }

  if (money < 10 || money > 10000) {
    throw new Error(ERROR_MESSAGE.WRONG_RANGE_CHARGE_MONEY);
  }

  if (money % 10 !== 0) {
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
