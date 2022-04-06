import { ERROR_MESSAGE, CONFIGURATION } from '../constants';

const userInputMoneyValidator = {
  isOverMax(currentInputMoney: number, userInputMoney: number) {
    return currentInputMoney + userInputMoney > CONFIGURATION.INPUT.MAX;
  },

  isIncorrectUnit(inputMoney: number) {
    return inputMoney % CONFIGURATION.AMOUNT.UNIT !== 0;
  },
};

export const validateInputMoney = (money: number, userInputMoneyAmount: number): void => {
  if (userInputMoneyValidator.isOverMax(money, userInputMoneyAmount)) {
    throw new Error(ERROR_MESSAGE.OVER_INPUT_MONEY);
  }

  if (userInputMoneyValidator.isIncorrectUnit(money)) {
    throw new Error(ERROR_MESSAGE.INCORRECT_UNIT_INPUT_MONEY);
  }
};
