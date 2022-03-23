import { isDivideUnit } from './common.js';
import { ERROR_MESSAGE } from '../constants/index.js';

export const validProductPrice = (price) => {
  if (isDivideUnit(price, 10)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
  return true;
};
