import { PRODUCT, ERROR_MESSAGE, COIN } from '../constants/constants';
import {
  isEmpty,
  isDivideUnit,
  isMaximumLength,
  isRangeNumber,
  isOverMaxNumber,
} from '../utils/common';
import { Product } from '../interface/productManage.interface';

const isDuplicateProduct = (name: string, products: Product[]): boolean => {
  return products.some((product) => product.name === name);
};

export const validProductInfo = (
  { name, price, quantity }: Product,
  products: Product[]
): boolean => {
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

export const validAmount = (amount: number, totalAmount: number): boolean => {
  if (isDivideUnit(amount, COIN.MIN_UNIT)) {
    throw new Error(ERROR_MESSAGE.NOT_DIVIDE_NUMBER);
  }
  if (isOverMaxNumber(totalAmount, COIN.MAX_AMOUNT)) {
    throw new Error(ERROR_MESSAGE.OVER_MAX_AMOUNT);
  }
  return true;
};

export const validProductPurchase = (price: number, userAmount: number): boolean => {
  if (isOverMaxNumber(price, userAmount)) {
    throw new Error(ERROR_MESSAGE.OVER_USER_AMOUNT);
  }
  return true;
};
