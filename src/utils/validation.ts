import {
  ERROR_MSG,
  MONEY_DIVIDE_STANDARD,
  NAME_LENGHT_LIMIT,
  PRICE_RANGE,
  QUANTITY_RANGE,
} from './constants';

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

export const checkChangeInput = (changeInput: number) => {
  if (isNotdivisibleBy10(changeInput)) {
    throw new Error('잔돈은 10으로 나누어 떨어져야합니다.');
  }
  if (isOutOfChangeRange(changeInput)) {
    throw new Error('잔돈은 10이상 100000이하의 금액을 투입하여야 합니다.');
  }
  return true;
};

export const isOverLimitLength = (nameInput: string) => nameInput.length > NAME_LENGHT_LIMIT;

export const isEmptyName = (nameInput: string) => nameInput.length === 0;

export const isOutOfPriceRange = (priceInput: number) =>
  priceInput < PRICE_RANGE.MIN || priceInput > PRICE_RANGE.MAX;

export const isNotdivisibleBy10 = (priceInput: number) => priceInput % MONEY_DIVIDE_STANDARD !== 0;

export const isOutOfQuantityRange = (qauntityInput: number) =>
  qauntityInput < QUANTITY_RANGE.MIN || qauntityInput > QUANTITY_RANGE.MAX;

export const isOutOfChangeRange = (changeInput: number) => changeInput < 10 || changeInput > 100000;
