import { ERROR_MESSAGE } from '../constants/errorMessage';

export const checkValidName = (name: string): void | never => {
  if (name.length < 2 || name.length > 6) {
    throw new Error(ERROR_MESSAGE.WRONG_FORMAT_NAME);
  }
};

export const checkValidPassword = (
  password: string,
  passwordConfirm: string
): void | never => {
  // 8 ~ 16자 영문 + 숫자 조합 정규식
  const passWordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  if (!passWordRegExp.test(password)) {
    throw new Error(ERROR_MESSAGE.WRONG_FORMAT_PASSWORD);
  }

  if (password !== passwordConfirm) {
    throw new Error(ERROR_MESSAGE.MISMATCH_PASSWORD);
  }
};

export const checkValidEmail = (email: string): void | never => {
  // 올바른 이메일 형식인지 확인하는 정규식
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!emailRegExp.test(email)) {
    throw new Error(ERROR_MESSAGE.WRONG_FORMAT_EMAIL);
  }
};
