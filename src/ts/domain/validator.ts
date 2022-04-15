import ProductType from '../type/ProductType';
import { ERROR_MESSAGE, VENDING_MACHINE_RULE, USER_RULE } from '../constants';

const isEmptyName = (name: string) => name.trim().length === 0;

const isOverNameMinLength = (name: string) => name.length > VENDING_MACHINE_RULE.MAX_NAME_LENGTH;

const isOutOfPriceRange = (price: number) =>
  price < VENDING_MACHINE_RULE.MIN_PRICE || price > VENDING_MACHINE_RULE.MAX_PRICE;

const isInvalidUnit = (price: number) => price % VENDING_MACHINE_RULE.UNIT !== 0;

const isOverMaxValue = (value: number, max: number) => value > max;

const isUnderMinValue = (value: number, min: number) => value < min;

const isNotSame = (origin: string, compare: string) => origin !== compare;

export const checkProductValidation = (product: ProductType) => {
  if (isEmptyName(product.name)) {
    throw new Error(ERROR_MESSAGE.NAME_EMPTY);
  }
  if (isOverNameMinLength(product.name)) {
    throw new Error(ERROR_MESSAGE.NAME_LENGTH);
  }
  if (isOutOfPriceRange(product.price)) {
    throw new Error(ERROR_MESSAGE.PRICE_RANGE);
  }
  if (isInvalidUnit(product.price)) {
    throw new Error(ERROR_MESSAGE.PRICE_UNIT);
  }
  if (isOverMaxValue(product.quantity, VENDING_MACHINE_RULE.MAX_QUANTITY)) {
    throw new Error(ERROR_MESSAGE.EXCEED_QUANTITY);
  }
  if (!Number.isInteger(product.quantity)) {
    throw new Error(ERROR_MESSAGE.NOT_INTEGER);
  }
};

export const checkDuplicatedProduct = (products: ProductType[], name: string) => {
  if (products.find((product) => product.name === name.trim())) {
    throw new Error(ERROR_MESSAGE.DUPLICATED_PRODUCT);
  }
};

export const checkRechargeMoney = (money: number, holdingMoney: number) => {
  if (isOverMaxValue(holdingMoney, VENDING_MACHINE_RULE.MAX_HOLDING_MONEY)) {
    throw new Error(ERROR_MESSAGE.EXCEED_HOLDING_MONEY);
  }
  if (isUnderMinValue(money, VENDING_MACHINE_RULE.MIN_RECHARGING_MONEY)) {
    throw new Error(ERROR_MESSAGE.UNDER_MIN_RECHARGING_MONEY);
  }
  if (isInvalidUnit(money)) {
    throw new Error(ERROR_MESSAGE.RECHARGE_MONEY_UNIT);
  }
};

export const checkPurchaseMoney = (money: number) => {
  if (isOverMaxValue(money, VENDING_MACHINE_RULE.MAX_PURCHASE_MONEY)) {
    throw new Error(ERROR_MESSAGE.EXCEED_PURCHASE_MONEY);
  }
  if (isUnderMinValue(money, VENDING_MACHINE_RULE.MIN_PURCHASE_MONEY)) {
    throw new Error(ERROR_MESSAGE.UNDER_MIN_PURCHASE_MONEY);
  }
  if (isInvalidUnit(money)) {
    throw new Error(ERROR_MESSAGE.MONTY_UNIT);
  }
};

export const checkRegister = (name: string, password: string, passwordCheck: string) => {
  if (
    isOverMaxValue(name.length, USER_RULE.MAX_NAME_LENGTH) ||
    isUnderMinValue(name.length, USER_RULE.MIN_NAME_LENGTH)
  ) {
    throw new Error(ERROR_MESSAGE.USER_NAME_LENGTH);
  }
  if (
    isOverMaxValue(password.length, USER_RULE.MAX_PASSWORD_LENGTH) ||
    isUnderMinValue(password.length, USER_RULE.MIN_PASSWORD_LENGTH)
  ) {
    throw new Error(ERROR_MESSAGE.USER_PASSWORD_LENGTH);
  }
  if (isNotSame(password, passwordCheck)) {
    throw new Error(ERROR_MESSAGE.PASSWORD_CHECK);
  }
};
