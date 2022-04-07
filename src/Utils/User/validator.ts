import { isStringLengthInRange } from 'Utils';
import { ERROR_MESSAGE } from 'Constants';

export const isPassEmailRules = (email: string): boolean => {
  const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]*$/g;
  return regex.test(email);
};

export const isPassPasswordRules = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g;
  return regex.test(password);
};

export const isUserNameRules = (name: string): boolean => isStringLengthInRange(name, 1, 6);

export const validateUserRegister = (
  email: string,
  name: string,
  password: string,
  passwordConfirm: string,
): boolean => {
  if (!isPassEmailRules(email)) throw new Error(ERROR_MESSAGE.USER_EMAIL_TYPE_WRONG);

  if (!isStringLengthInRange(name, 1, 6)) throw new Error(ERROR_MESSAGE.USER_NAME_WRONG_RANGE);

  if (!isPassPasswordRules(password)) throw new Error(ERROR_MESSAGE.USER_PASSWORD_TYPE_WRONG);

  if (password !== passwordConfirm) throw new Error(ERROR_MESSAGE.USER_PASSWORD_CONFIRM_DIFF);

  return true;
};

export const validateUserLogin = (email: string, password: string): boolean => {
  if (!isPassEmailRules(email)) throw new Error(ERROR_MESSAGE.USER_EMAIL_TYPE_WRONG);

  if (!isPassPasswordRules(password)) throw new Error(ERROR_MESSAGE.USER_PASSWORD_TYPE_WRONG);

  return true;
};

export const validateUserProfileEdit = (
  name: string,
  password: string,
  passwordConfirm: string,
): boolean => {
  if (!isStringLengthInRange(name, 1, 6)) throw new Error(ERROR_MESSAGE.USER_NAME_WRONG_RANGE);

  if (!isPassPasswordRules(password)) throw new Error(ERROR_MESSAGE.USER_PASSWORD_TYPE_WRONG);

  if (password !== passwordConfirm) throw new Error(ERROR_MESSAGE.USER_PASSWORD_CONFIRM_DIFF);

  return true;
};
