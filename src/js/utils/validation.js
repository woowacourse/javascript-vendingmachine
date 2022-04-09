import {
  isEmpty,
  isDivideUnit,
  isMaximumLength,
  isRangeNumber,
  isOverMaxNumber,
} from './common.js';
import { PRODUCT, ERROR_MESSAGE, COIN } from '../constants/constants.js';

const isDuplicateProduct = (name, products) => {
  return products.some((product) => product.name === name);
};

export const validProductInfo = ({ name, price, quantity }, products) => {
  if (isEmpty(name)) {
    throw new Error(ERROR_MESSAGE.EMPTY_NAME);
  }
  if (Number.isNaN(price)) {
    throw new Error(ERROR_MESSAGE.EMPTY_PRICE);
  }
  if (Number.isNaN(quantity)) {
    throw new Error(ERROR_MESSAGE.EMPTY_QUANTITY);
  }
  if (isDuplicateProduct(name, products)) {
    throw new Error(ERROR_MESSAGE.DUPLICATE_PRODUCT);
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

export const validChargeAmount = (amount, totalAmount) => {
  if (isDivideUnit(amount, COIN.MIN_UNIT)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
  if (isOverMaxNumber(totalAmount, COIN.MAX_AMOUNT)) {
    throw new Error(ERROR_MESSAGE.OVER_MAX_AMOUNT);
  }
};

export const validPurchaseAmount = (amount) => {
  if (isDivideUnit(amount, COIN.MIN_UNIT)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
};

export const validAffordablePrice = (amount, price) => {
  if (amount < price) {
    throw new Error(ERROR_MESSAGE.SHORTAGE_OF_MONEY);
  }
};

export const validPassword = (password, passwordConfirm) => {
  const passwordRule = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
  if (!passwordRule.test(password)) {
    throw Error(ERROR_MESSAGE.INVALID_PASSWORD);
  }
  if (password !== passwordConfirm) {
    throw Error(ERROR_MESSAGE.NOT_SAME_PASSWORD);
  }
};
