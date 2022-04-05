import { ERROR_MESSAGE } from '../constants/errorConstants';

export const signValidate = {
  signUp: ({ email, name, password, confirmPassword }) => {
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

  editProfile: ({ name, password, confirmPassword }) => {
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

function checkPassword(password) {
  const regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return regularExpression.test(password);
}

function checkConfirmPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function checkEmail(email) {
  const regularExpression =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regularExpression.test(email);
}

function checkName(name) {
  const regularExpression = /^[가-힣]{2,8}$|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  return regularExpression.test(name);
}
