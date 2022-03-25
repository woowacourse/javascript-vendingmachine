import { isDivideUnit } from './common.js';
import { PRODUCT_PRICE_UNIT, NOT_DIVIDE_ERROR_MESSAGE } from '../constants/index.js';

export const validProductPriceUnit = (price) => {
  if (isDivideUnit(price, PRODUCT_PRICE_UNIT)) {
    throw new Error(NOT_DIVIDE_ERROR_MESSAGE);
  }
  return true;
};
