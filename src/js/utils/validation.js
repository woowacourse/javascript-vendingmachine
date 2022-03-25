import { isEmpty, isDivideUnit, isMaximumLength, isRangeNumber } from './common.js';
import { PRODUCT_PRICE_UNIT, ERROR_MESSAGE } from '../constants/constants.js';

export const validProductInfo = ({ name, price, quantity }) => {
  if (isEmpty(name)) {
    throw new Error(ERROR_MESSAGE.EMPTY_NAME);
  }
  if (Number.isNaN(price)) {
    throw new Error(ERROR_MESSAGE.EMPTY_PRICE);
  }
  if (Number.isNaN(quantity)) {
    throw new Error(ERROR_MESSAGE.EMPTY_QUANTITY);
  }
  if (isMaximumLength(name, 10)) {
    throw new Error(ERROR_MESSAGE.OVER_MAX_LENGTH);
  }
  if (isDivideUnit(price, PRODUCT_PRICE_UNIT)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
  if (isRangeNumber(price, 100, 10000)) {
    throw new Error(ERROR_MESSAGE.OUT_OF_PRICE_RANGE);
  }
  if (isRangeNumber(quantity, 1, 20)) {
    throw new Error(ERROR_MESSAGE.OUT_OF_QUANTITY_RANGE);
  }
  return true;
};
