import { isStringLengthInRange } from 'Utils';
import { ERROR_MESSAGE, MEMBER_SERVICE } from 'Constants';

export const isPassEmailRules = (email: string): boolean => {
  const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]*$/g;
  return regex.test(email);
};

export const isPassPasswordRules = (password: string): boolean => {
  const regex = /^.*(?=.{6,})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
  return regex.test(password);
};

export const isUserNameRules = (name: string): boolean =>
  isStringLengthInRange(name, MEMBER_SERVICE.MIN_USER_NAME, MEMBER_SERVICE.MAX_USER_NAME);

export const validateUserRegister = (
  email: string,
  name: string,
  password: string,
  passwordConfirm: string,
): boolean => {
  if (!isPassEmailRules(email)) throw new Error(ERROR_MESSAGE.USER_EMAIL_TYPE_WRONG);

  if (!isUserNameRules(name)) throw new Error(ERROR_MESSAGE.USER_NAME_WRONG_RANGE);

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
  if (!isUserNameRules(name)) throw new Error(ERROR_MESSAGE.USER_NAME_WRONG_RANGE);

  if (!isPassPasswordRules(password)) throw new Error(ERROR_MESSAGE.USER_PASSWORD_TYPE_WRONG);

  if (password !== passwordConfirm) throw new Error(ERROR_MESSAGE.USER_PASSWORD_CONFIRM_DIFF);

  return true;
};
