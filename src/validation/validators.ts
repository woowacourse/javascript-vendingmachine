import {
  ERROR_MESSAGE,
  MAX_CHARGABLE_MONEY,
  MAX_LENGTH_OF_PRODUCT_NAME,
  MAX_PRODUCT_PRICE,
  MAX_PRODUCT_QUANTITY,
  MIN_COIN_UNIT,
  MIN_PRODUCT_PRICE,
  MIN_PRODUCT_QUANTITY,
} from '../constants';
import { ProductItem, RawProductItem } from '../types';
import { convertToInteger } from '../utils';
import ValidationResult from './validation-result';

const isInteger = (str: string) => {
  return /^-?[0-9]+$/g.test(str);
};

const checkPassword = (password: string, confirmPassword: string): string => {
  const number = password.search(/[0-9]/g);
  const character = password.search(/[a-z]/gi);
  const symbol = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (password !== confirmPassword) {
    return ERROR_MESSAGE.DIFFERENT_PASSWORD;
  } else if (number < 0 || character < 0 || symbol < 0) {
    return ERROR_MESSAGE.NEED_MORE_COMPLICATED_PASSWORD;
  } else if (/(\w)\1\1\1/.test(password)) {
    return ERROR_MESSAGE.NO_REPEATED_CHAR;
  } else if (password.search(/\s/) != -1) {
    return ERROR_MESSAGE.NO_SPACE_REQUIRED;
  }
  return 'pass';
};

export const validateProductName = (name: string, productList: Array<ProductItem>) => {
  if (!name) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_NAME);

  if (name.length > MAX_LENGTH_OF_PRODUCT_NAME)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_LENGTH_PRODUCT_NAME);

  if (productList.some((item) => name === item.name))
    return new ValidationResult(true, ERROR_MESSAGE.DUPLICATE_PRDUCT_NAME);

  return new ValidationResult(false);
};

export const validateProductPrice = (price: string) => {
  if (!price) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_PRICE);

  if (!isInteger(price)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_PRODUCT_PRICE);

  const priceNum = convertToInteger(price, 0);
  if (priceNum < MIN_PRODUCT_PRICE || MAX_PRODUCT_PRICE < priceNum)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_PRICE);

  if (priceNum % MIN_COIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_PRODUCT_PRICE);

  return new ValidationResult(false);
};

export const validateProductQuantity = (quantity: string) => {
  if (!quantity) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY);

  if (!isInteger(quantity))
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_QUANTITY);

  const quantityNum = convertToInteger(quantity, 0);
  if (quantityNum < MIN_PRODUCT_QUANTITY || MAX_PRODUCT_QUANTITY < quantityNum)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_IN_VALID_RANGE_PRODUCT_QUANTITY);

  return new ValidationResult(false);
};

export const validateProduct = (
  { name, price, quantity }: RawProductItem,
  productList: Array<ProductItem>
) => {
  return [
    validateProductName(name, productList),
    validateProductPrice(price),
    validateProductQuantity(quantity),
  ].filter((result) => result.hasError);
};

export const validateChargeCoins = (money: string, chargedMoney: number) => {
  if (!money) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_CHARGE_MONEY);

  if (!isInteger(money)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_CHARGE_MONEY);

  const moneyNum = convertToInteger(money, 0);
  if (moneyNum <= 0) return new ValidationResult(true, ERROR_MESSAGE.NEGATIVE_CHARGE_MONEY);

  if (moneyNum % MIN_COIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_CHARGE_MONEY);

  if (MAX_CHARGABLE_MONEY < moneyNum + chargedMoney)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_CHARGE_MONEY);

  return new ValidationResult(false);
};

export const validateInsertMoney = (money: string, totalMoney: number) => {
  if (!money) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_INSERT_MONEY);

  if (!isInteger(money)) return new ValidationResult(true, ERROR_MESSAGE.NOT_NUMBER_INSERT_MONEY);

  const moneyNum = convertToInteger(money, 0);
  if (moneyNum <= 0) return new ValidationResult(true, ERROR_MESSAGE.NEGATIVE_INSERT_MONEY);

  if (moneyNum % MIN_COIN_UNIT)
    return new ValidationResult(true, ERROR_MESSAGE.NOT_DIVIDED_BY_TEN_INSERT_MONEY);

  if (moneyNum + totalMoney > 10000)
    return new ValidationResult(true, ERROR_MESSAGE.OVER_MAX_INSERT_MONEY);

  return new ValidationResult(false);
};

export const validateReturnChanges = (insertedMoney: number) => {
  if (insertedMoney === 0) return new ValidationResult(true, ERROR_MESSAGE.EMPTY_INSERT_MONEY);

  return new ValidationResult(false);
};

export const validateSignUp = (name: string, password: string, confirmPassword: string) => {
  if (name.length < 2 || name.length > 6)
    return new ValidationResult(true, '이름은 2글자 ~ 6글자 이내이어야 합니다.');

  const errorCheck = checkPassword(password, confirmPassword);
  if (errorCheck !== 'pass') return new ValidationResult(true, errorCheck);

  return new ValidationResult(false);
};
