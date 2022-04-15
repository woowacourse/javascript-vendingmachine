import { ERROR_MESSAGE } from '../constants';

const signupValidator = {
  isInsufficientPassword(password: string) {
    return !/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/.test(password);
  },

  isWrongPassword(password: string, passwordConfirm: string) {
    return password !== passwordConfirm;
  },

  isInsufficientName(name: string) {
    return name.length < 2 || name.length > 6;
  },
};

export const validateSignup = (userName: string, password: string, passwordConfirm: string) => {
  if (signupValidator.isInsufficientName(userName)) {
    throw new Error(ERROR_MESSAGE.INSUFFICIENT_NAME);
  }

  if (signupValidator.isInsufficientPassword(password)) {
    throw new Error(ERROR_MESSAGE.INSUFFICIENT_PASSWORD);
  }

  if (signupValidator.isWrongPassword(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.WRONG_PASSWORD);
  }
};

const profileEditValidator = {
  isLogin(token: string | null) {
    return !!token;
  },
};

export const validateProfileEdit = (password: string, passwordConfirm: string, token: string | null) => {
  if (signupValidator.isInsufficientPassword(password)) {
    throw new Error(ERROR_MESSAGE.INSUFFICIENT_PASSWORD);
  }

  if (signupValidator.isWrongPassword(password, passwordConfirm)) {
    throw new Error(ERROR_MESSAGE.WRONG_PASSWORD);
  }

  if (!profileEditValidator.isLogin(token)) {
    throw new Error(ERROR_MESSAGE.UNAUTHORIZED_IN_EDIT);
  }
};
