import {
  CHANGE_RANGE,
  CHARGE_RANGE,
  ERROR_MSG,
  MONEY_DIVIDE_STANDARD,
  NAME_LENGTH_LIMIT,
  PRICE_RANGE,
  QUANTITY_RANGE,
  USER_NAME_RANGE,
} from './constants';

export const isOverNameLimitLength = (nameInput: string) => nameInput.length > NAME_LENGTH_LIMIT;

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
  if (isOverNameLimitLength(nameInput)) {
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

export const isOutOfChargeRange = (chargeInput: number) =>
  chargeInput < CHARGE_RANGE.MIN || chargeInput > CHARGE_RANGE.MAX;

export const checkInputChargeInput = (chargeInput: number) => {
  if (isNotdivisibleBy10(chargeInput)) {
    throw new Error(ERROR_MSG.PRICE_NOT_DIVISIBLE_BY_10);
  }
  if (isOutOfChargeRange(chargeInput)) {
    throw new Error(ERROR_MSG.CHARGE_OUT_OF_RANGE);
  }
  return true;
};

export const isNotMatchEmailForm = (emailInput: string) =>
  !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
    emailInput,
  );
export const isOutOfUserNameRange = (userNameInput: string) =>
  userNameInput.length < USER_NAME_RANGE.MIN || userNameInput.length > USER_NAME_RANGE.MAX;

export const isNotMatchPasswordForm = (passwordInput: string) =>
  !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?]).{8,20}$/.test(passwordInput);

export const isSamePasswordInput = (passwordInput: string, passwordConfirmInput: string) =>
  passwordInput != passwordConfirmInput;

export const checkSignInInput = ({
  emailInput,
  nameInput,
  passwordInput,
  passwordConfirmInput,
}: {
  emailInput: string;
  nameInput: string;
  passwordInput: string;
  passwordConfirmInput: string;
}) => {
  if (isNotMatchEmailForm(emailInput)) {
    throw new Error(ERROR_MSG.NOT_MATCH_EMAIL_FORM);
  }
  if (isOutOfUserNameRange(nameInput)) {
    throw new Error(ERROR_MSG.OVER_USER_NAME_RANGE);
  }
  if (isNotMatchPasswordForm(passwordInput)) {
    throw new Error(ERROR_MSG.NOT_MATCH_PASSWORD_FORM);
  }
  if (isSamePasswordInput(passwordInput, passwordConfirmInput)) {
    throw new Error(ERROR_MSG.NOT_SAME_PASSWORD);
  }
  return true;
};

export const checkEditUserInput = ({
  nameInput,
  passwordInput,
  passwordConfirmInput,
}: {
  nameInput: string;
  passwordInput: string;
  passwordConfirmInput: string;
}) => {
  if (isOutOfUserNameRange(nameInput)) {
    throw new Error(ERROR_MSG.OVER_USER_NAME_RANGE);
  }
  if (isNotMatchPasswordForm(passwordInput)) {
    throw new Error(ERROR_MSG.NOT_MATCH_PASSWORD_FORM);
  }
  if (isSamePasswordInput(passwordInput, passwordConfirmInput)) {
    throw new Error(ERROR_MSG.NOT_SAME_PASSWORD);
  }
  return true;
};
