import { isDivideUnit } from './common.js';
import { PRODUCT_PRICE_UNIT, ERROR_MESSAGE } from '../constants/index.js';

export const validProductPriceUnit = (price) => {
  if (isDivideUnit(price, PRODUCT_PRICE_UNIT)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
  return true;
};
