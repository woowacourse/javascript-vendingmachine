import { isStringLengthInRange, isNumberInRange, isCorrectNumberUnit } from 'Utils';
import { VENDING_MACHINE, ERROR_MESSAGE } from 'Constants';

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

export const validateChargeAmountToAdd = (chargeAmount: number, totalAmount: number) => {
  const { MAX_CHARGED_AMOUNT, MONEY_UNIT } = VENDING_MACHINE;

  if (!Number.isInteger(chargeAmount)) throw new Error('충전 금액은 숫자만 입력할 수 있습니다.');
  if (!isCorrectNumberUnit(chargeAmount, MONEY_UNIT))
    throw new Error('충전 금액은 10원 단위로 입력할 수 있습니다.');
  if (chargeAmount + totalAmount > MAX_CHARGED_AMOUNT)
    throw new Error('최대 1만원까지만 충전할 수 있습니다.');

  return true;
};
