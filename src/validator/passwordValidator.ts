import { ERROR_MESSAGE } from '../constants';

const passwordValidator = {
  isNotEqual(password, passwordConfirm) {
    return password !== passwordConfirm;
  },

  isInvalid(password) {
    return !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  },
};

export const validatePasswordCondition = (password: string) => {
  if (passwordValidator.isInvalid(password)) {
    throw new Error(ERROR_MESSAGE.NOT_MATCH_PASSWORD_REGEXP);
  }
};

export const validatePasswordIsEqual = (password: string, passwordConfirm: string) => {
  if (passwordValidator.isNotEqual(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.PASSWORD_CONFIRM);
  }
};
