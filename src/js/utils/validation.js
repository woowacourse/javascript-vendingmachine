import { isEmpty, isDivideUnit, isMaximumLength, isRangeNumber } from './common.js';
import { PRODUCT, ERROR_MESSAGE, COIN_UNIT } from '../constants/constants.js';

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
  if (isMaximumLength(name, PRODUCT.MAX_LENGTH)) {
    throw new Error(ERROR_MESSAGE.OVER_MAX_LENGTH);
  }
  if (isDivideUnit(price, PRODUCT.PRICE_UNIT)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
  if (isRangeNumber(price, PRODUCT.PRICE_RANGE.MIN, PRODUCT.PRICE_RANGE.MAX)) {
    throw new Error(ERROR_MESSAGE.OUT_OF_PRICE_RANGE);
  }
  if (isRangeNumber(quantity, PRODUCT.QUANTITY_RANGE.MIN, PRODUCT.QUANTITY_RANGE.MAX)) {
    throw new Error(ERROR_MESSAGE.OUT_OF_QUANTITY_RANGE);
  }
  return true;
};

export const validChargeCoinUnit = (coin) => {
  if (isDivideUnit(coin, COIN_UNIT)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
};
