import {
  CHANGE_RANGE,
  ERROR_MSG,
  MONEY_DIVIDE_STANDARD,
  NAME_LENGTH_LIMIT,
  PRICE_RANGE,
  QUANTITY_RANGE,
} from './constants';

/** Domain */
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
  if (isOutOfChangeRange(changeInput)) {
    throw new Error(ERROR_MSG.CHANGE_OUT_OF_RANGE);
  }
  if (isNotdivisibleBy10(changeInput)) {
    throw new Error(ERROR_MSG.CHANGE_NOT_DIVISIBLE_BY_10);
  }
  return true;
};

/** User */
export const isOutOfNameRange = name => {
  return name.length < 2 || name.length > 6;
};

export const isInValidPassword = password => {
  const regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return password.match(regExp) === null;
};

export const checkJoinPossible = (name, password, passwordReenter) => {
  if (isOutOfNameRange(name)) {
    throw new Error('이름은 2자~6자 입니다.');
  }
  if (isInValidPassword(password)) {
    throw new Error('비밀번호는 문자와 숫자 포함 8자 이상이어야 합니다.');
  }
  if (password !== passwordReenter) {
    throw new Error('다시 입력한 비밀번호가 일치하지 않습니다.');
  }
  return true;
};
