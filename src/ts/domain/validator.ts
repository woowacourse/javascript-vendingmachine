import ProductType from '../type/ProductType';
import { ERROR_MESSAGE, VENDING_MACHINE_RULE } from '../constants';

const isEmptyName = (name: string) => name.trim().length === 0;

const isOverNameMinLength = (name: string) => name.length > VENDING_MACHINE_RULE.MAX_NAME_LENGTH;

const isOutOfPriceRange = (price: number) =>
  price < VENDING_MACHINE_RULE.MIN_PRICE || price > VENDING_MACHINE_RULE.MAX_PRICE;

const isInvalidUnit = (price: number) => price % VENDING_MACHINE_RULE.UNIT !== 0;

const isOverMaxValue = (value: number, max: number) => value > max;

const isUnderMinValue = (value: number, min: number) => value < min;

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

export const checkMoneyValidation = (money: number, holdingMoney: number) => {
  if (isInvalidUnit(money)) {
    throw new Error(ERROR_MESSAGE.RECHARGE_MONEY_UNIT);
  }
  if (isOverMaxValue(holdingMoney, VENDING_MACHINE_RULE.MAX_HOLDING_MONEY)) {
    throw new Error(ERROR_MESSAGE.EXCEED_HOLDING_MONEY);
  }
  if (isUnderMinValue(money, VENDING_MACHINE_RULE.MIN_RECHARGING_MONEY)) {
    throw new Error(ERROR_MESSAGE.UNDER_MIN_RECHARGING_MONEY);
  }
};
