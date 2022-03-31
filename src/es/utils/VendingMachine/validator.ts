import { VENDING_MACHINE, ERROR_MESSAGE } from '../../constants';
import { IProduct } from '../../store/Interface';
import { isStringLengthInRange, isNumberInRange, isCorrectNumberUnit } from '../index';

export const validateProduct = (product: IProduct) => {
  const { name, price, quantity } = product;

  const {
    MIN_PRODUCT_NAME,
    MAX_PRODUCT_NAME,
    MIN_PRODUCT_PRICE,
    MAX_PRODUCT_PRICE,
    MONEY_UNIT,
    MIN_PRODUCT_QUANTITY,
    MAX_PRODUCT_QUANTITY,
  } = VENDING_MACHINE;

  if (name === '') throw new Error(ERROR_MESSAGE.PRODUCT_NAME_REQUIRED);
  if (!isStringLengthInRange(name, MIN_PRODUCT_NAME, MAX_PRODUCT_NAME))
    throw new Error(ERROR_MESSAGE.PRODUCT_NAME_LENGTH);

  if (!Number.isInteger(price)) throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_ONLY_NUMBER);

  if (!isNumberInRange(price, MIN_PRODUCT_PRICE, MAX_PRODUCT_PRICE))
    throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_WRONG_RANGE);

  if (!isCorrectNumberUnit(price, MONEY_UNIT))
    throw new Error(ERROR_MESSAGE.PRODUCT_PRICE_WRONG_UNIT);

  if (!Number.isInteger(quantity)) throw new Error(ERROR_MESSAGE.PRODUCT_QUANTITY_ONLY_NUMBER);

  if (!isNumberInRange(quantity, MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY))
    throw new Error(ERROR_MESSAGE.PRODUCT_QUANTITY_WRONG_RANGE);

  return true;
};

export const validateHoldingAmountToAdd = (holdingAmountToAdd: number, totalAmount: number) => {
  const { MAX_HOLDING_AMOUNT, MONEY_UNIT } = VENDING_MACHINE;

  if (!Number.isInteger(holdingAmountToAdd))
    throw new Error(ERROR_MESSAGE.HOLDING_AMOUNT_ONLY_NUMBER);
  if (!isCorrectNumberUnit(holdingAmountToAdd, MONEY_UNIT))
    throw new Error(ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_UNIT);
  if (holdingAmountToAdd + totalAmount > MAX_HOLDING_AMOUNT)
    throw new Error(ERROR_MESSAGE.HOLDING_AMOUNT_WRONG_LIMIT);

  return true;
};
