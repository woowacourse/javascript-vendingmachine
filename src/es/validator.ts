import { IProduct } from './interface';
import { VENDING_MACHINE_CONDITION, ERROR_MESSAGE, USER_INFO_CONDITION } from './constants';
import { isStringLengthInRange, isNumberInRange, isCorrectNumberUnit } from './utils';

function validateProduct(product: IProduct) {
  const { name, price, quantity } = product;

  const {
    MIN_PRODUCT_NAME_LENGTH,
    MAX_PRODUCT_NAME_LENGTH,
    MIN_PRODUCT_PRICE,
    MAX_PRODUCT_PRICE,
    MONEY_UNIT,
    MIN_PRODUCT_QUANTITY,
    MAX_PRODUCT_QUANTITY,
  } = VENDING_MACHINE_CONDITION;

  if (name === '') throw new Error(ERROR_MESSAGE.PRODUCT_NAME_REQUIRED);
  if (!isStringLengthInRange(name, MIN_PRODUCT_NAME_LENGTH, MAX_PRODUCT_NAME_LENGTH))
    throw new Error(ERROR_MESSAGE.PRODUCT_NAME_LENGTH);

  if (!Number.isInteger(price)) throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_ONLY_NUMBER);

  if (!isNumberInRange(price, MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE))
    throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_WRONG_RANGE);

  if (!isCorrectNumberUnit(price, MONEY_UNIT))
    throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_WRONG_UNIT);

  if (!Number.isInteger(quantity)) throw new Error(ERROR_MESSAGE.PRODUCT_QUANTITY_ONLY_NUMBER);

  if (!isNumberInRange(quantity, MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY))
    throw new Error(ERROR_MESSAGE.PRODUCT_QUANTITY_WRONG_RANGE);
}

function validateHoldingAmountToAdd(holdingAmountToAdd: number, totalAmount: number) {
  const { MAX_HOLDING_AMOUNT, MONEY_UNIT } = VENDING_MACHINE_CONDITION;

  if (!Number.isInteger(holdingAmountToAdd))
    throw new Error(ERROR_MESSAGE.HOLDING_AMOUNT_ONLY_NUMBER);
  if (!isCorrectNumberUnit(holdingAmountToAdd, MONEY_UNIT))
    throw new Error(ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_UNIT);
  if (holdingAmountToAdd + totalAmount > MAX_HOLDING_AMOUNT)
    throw new Error(ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_LIMIT);
}

function validateCustomerChargeToAdd(customerChargeToAdd: number) {
  const { MAX_CUSTOMER_CHARGE_TO_ADD, MONEY_UNIT } = VENDING_MACHINE_CONDITION;

  if (!Number.isInteger(customerChargeToAdd))
    throw new Error(ERROR_MESSAGE.CUSTOMER_CHARGE_ONLY_NUMBER);
  if (!isCorrectNumberUnit(customerChargeToAdd, MONEY_UNIT))
    throw new Error(ERROR_MESSAGE.CUSTOMER_CHARGE_WRONG_UNIT);
  if (customerChargeToAdd > MAX_CUSTOMER_CHARGE_TO_ADD)
    throw new Error(ERROR_MESSAGE.CUSTOMER_CHARGE_WRONG_LIMIT);
}

function validateUserInfo(userInfo) {
  const { name, password, passwordConfirm } = userInfo;
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = USER_INFO_CONDITION;

  if (!isStringLengthInRange(name, MIN_NAME_LENGTH, MAX_NAME_LENGTH))
    throw new Error(ERROR_MESSAGE.USER_NAME_LENGTH);
  if (!USER_INFO_CONDITION.PASSWORD_REGEXP.test(password))
    throw new Error(ERROR_MESSAGE.PASSWORD_CONDITION);
  if (password !== passwordConfirm) {
    throw new Error(ERROR_MESSAGE.PASSWORD_CONFIRM);
  }
}

export {
  validateProduct,
  validateHoldingAmountToAdd,
  validateCustomerChargeToAdd,
  validateUserInfo,
};
