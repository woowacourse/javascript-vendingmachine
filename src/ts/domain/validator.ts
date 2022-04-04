import ProductType from '../type/ProductType';
import { ERROR_MESSAGE, VENDING_MACHINE_RULE } from '../constants';

const isEmptyName = (name: string) => name.trim().length === 0;

const isOverNameMinLength = (name: string) => name.length > VENDING_MACHINE_RULE.MAX_NAME_LENGTH;

const isOutOfPriceRange = (price: number) =>
  price < VENDING_MACHINE_RULE.MIN_PRICE || price > VENDING_MACHINE_RULE.MAX_PRICE;

const isInvalidUnit = (price: number, unit: number) => price % unit !== 0;

const isOverMaxValue = (value: number, max: number) => value > max;

const isUnderMinValue = (value: number, min: number) => value < min;

const isOutOfNameLength = (name: string) => name.length < 2 || name.length > 6;

const isInvalidPassword = (password: string) => {
  const regExp = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/;
  return !regExp.test(password);
};

const isDifferentPassword = (password: string, passwordCheck: string) => password !== passwordCheck;

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
  if (isInvalidUnit(product.price, VENDING_MACHINE_RULE.UNIT)) {
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

export const checkMoneyValidation = (money: number, holdingMoney: number) => {
  if (isInvalidUnit(money, VENDING_MACHINE_RULE.UNIT)) {
    throw new Error(ERROR_MESSAGE.RECHARGE_MONEY_UNIT);
  }
  if (isOverMaxValue(holdingMoney, VENDING_MACHINE_RULE.MAX_HOLDING_MONEY)) {
    throw new Error(ERROR_MESSAGE.EXCEED_HOLDING_MONEY);
  }
  if (isUnderMinValue(money, VENDING_MACHINE_RULE.MIN_RECHARGING_MONEY)) {
    throw new Error(ERROR_MESSAGE.UNDER_MIN_RECHARGING_MONEY);
  }
};

export const checkInsertedMoneyValidation = (money: number, holdingMoney: number) => {
  if (isInvalidUnit(money, VENDING_MACHINE_RULE.UNIT)) {
    throw new Error(ERROR_MESSAGE.INSERT_MONEY_UNIT);
  }
  if (isOverMaxValue(money + holdingMoney, VENDING_MACHINE_RULE.MAX_INSERTED_HOLDING_MONEY)) {
    throw new Error(ERROR_MESSAGE.EXCEED_INSERTED_HOLDING_MONEY);
  }
  if (isUnderMinValue(money, VENDING_MACHINE_RULE.MIN_INSERTING_MONEY)) {
    throw new Error(ERROR_MESSAGE.UNDER_MIN_INSERTED_HOLDING_MONEY);
  }
};

export const checkValidProfile = (name: string, password: string, passwordCheck: string) => {
  if (isOutOfNameLength(name)) {
    throw new Error(ERROR_MESSAGE.OUT_OF_NAME_LENGTH);
  }
  if (isInvalidPassword(password)) {
    throw new Error(ERROR_MESSAGE.INVALID_PASSWORD);
  }

  if (isDifferentPassword(password, passwordCheck)) {
    throw new Error(ERROR_MESSAGE.DIFFERENT_PASSWORD);
  }
};
