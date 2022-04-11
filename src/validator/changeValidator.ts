import { ERROR_MESSAGE, CONFIGURATION } from '../constants';

const changeValidator = {
  isOverMax(inputMoney: number, currentChange: number) {
    return inputMoney + currentChange > CONFIGURATION.AMOUNT.MAX;
  },

  isIncorrectUnit(inputMoney: number) {
    return inputMoney % CONFIGURATION.AMOUNT.UNIT !== 0;
  },
};

export const validateChange = (inputMoney: number, currentChange: number) => {
  if (changeValidator.isOverMax(inputMoney, currentChange)) {
    throw new Error(ERROR_MESSAGE.OVER_AMOUNT);
  }

  if (changeValidator.isIncorrectUnit(inputMoney)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_CHARGE_MONEY);
  }
};
