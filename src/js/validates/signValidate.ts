import { ERROR_MESSAGE } from '../constants/errorConstants';
import { signDataType } from '../types/types';

export const signValidate = {
  checkSignUpInputs: ({ email, name, password, confirmPassword }: signDataType) => {
    if (!checkEmail(email)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIGN.INVALID_EMAIL);
    }
    if (!checkName(name)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIGN.INVALID_NAME);
    }
    if (!checkConfirmPassword(password, confirmPassword)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIGN.NOT_MATCH_PASSWORD);
    }
    if (!checkPassword(password)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIGN.INVALID_PASSWORD);
    }
  },

  checkEditedProfileInputs: ({ name, password, confirmPassword }: signDataType) => {
    if (!checkName(name)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIGN.INVALID_NAME);
    }
    if (!checkConfirmPassword(password, confirmPassword)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIGN.NOT_MATCH_PASSWORD);
    }
    if (!checkPassword(password)) {
      throw new Error(ERROR_MESSAGE.INPUT_SIGN.INVALID_PASSWORD);
    }
  },
};

export function checkPassword(password: string) {
  const regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return regularExpression.test(password);
}

export function checkConfirmPassword(password: string, confirmPassword: string) {
  return password === confirmPassword;
}

export function checkEmail(email: string) {
  const regularExpression =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regularExpression.test(email);
}

export function checkName(name: string) {
  const regularExpression = /^[가-힣]{2,6}$|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  return regularExpression.test(name);
}
