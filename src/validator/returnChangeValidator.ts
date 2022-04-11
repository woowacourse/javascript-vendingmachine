import { ERROR_MESSAGE } from '../constants';

const returnChangeValidator = {
  isEmptyChange(chargedCoin) {
    return chargedCoin.getAmount() === 0;
  },
};

export const validateReturnCharge = (chargedCoin) => {
  if (returnChangeValidator.isEmptyChange(chargedCoin)) {
    throw new Error(ERROR_MESSAGE.EMPTY_CHANGE);
  }
};
