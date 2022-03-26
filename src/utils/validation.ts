import {
  CHANGE_RANGE,
  ERROR_MSG,
  MONEY_DIVIDE_STANDARD,
  NAME_LENGTH_LIMIT,
  PRICE_RANGE,
  QUANTITY_RANGE,
} from './constants';

export const isOverLimitLength = (nameInput: string) => nameInput.length > NAME_LENGTH_LIMIT;

export const isEmptyName = (nameInput: string) => nameInput.length === 0;

export const isOutOfPriceRange = (priceInput: number) =>
  priceInput < PRICE_RANGE.MIN || priceInput > PRICE_RANGE.MAX;

export const isNotdivisibleBy10 = (priceInput: number) => priceInput % MONEY_DIVIDE_STANDARD !== 0;

export const isOutOfQuantityRange = (qauntityInput: number) =>
  qauntityInput < QUANTITY_RANGE.MIN || qauntityInput > QUANTITY_RANGE.MAX;

export const checkProductInput = ({
  nameInput,
  priceInput,
  quantityInput,
}: {
  nameInput: string;
  priceInput: number;
  quantityInput: number;
}) => {
  if (isOverLimitLength(nameInput)) {
    throw new Error(ERROR_MSG.NAME_OVER_LIMIT_LENGTH);
  }
  if (isEmptyName(nameInput)) {
    throw new Error(ERROR_MSG.NAME_EMPTY);
  }
  if (isOutOfPriceRange(priceInput)) {
    throw new Error(ERROR_MSG.PRICE_OUT_OF_RANGE);
  }
  if (isNotdivisibleBy10(priceInput)) {
    throw new Error(ERROR_MSG.PRICE_NOT_DIVISIBLE_BY_10);
  }
  if (isOutOfQuantityRange(quantityInput)) {
    throw new Error(ERROR_MSG.QUANTITY_OUT_OF_RANGE);
  }
  return true;
};

export const isOutOfChangeRange = (changeInput: number) =>
  changeInput < CHANGE_RANGE.MIN || changeInput > CHANGE_RANGE.MAX;

export const checkChangeInput = (changeInput: number) => {
  if (isNotdivisibleBy10(changeInput)) {
    throw new Error(ERROR_MSG.CHANGE_NOT_DIVISIBLE_BY_10);
  }
  if (isOutOfChangeRange(changeInput)) {
    throw new Error(ERROR_MSG.CHANGE_OUT_OF_RANGE);
  }
  return true;
};
