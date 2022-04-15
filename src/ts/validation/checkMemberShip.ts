import { ERROR_MESSAGE } from '../constants/errorMessage';
import { VALID_NAME } from '../constants/membership';

export const checkValidName = (name: string): void | never => {
  if (
    name.length < VALID_NAME.MIN_LENGTH ||
    name.length > VALID_NAME.MAX_LENGTH
  ) {
    throw new Error(ERROR_MESSAGE.WRONG_FORMAT_NAME);
  }
};

export const checkValidPassword = (
  password: string,
  passwordConfirm: string
): void | never => {
  // 8 ~ 16자 영문 + 숫자 조합 정규식
  // 참고 링크 - https://rateye.tistory.com/468
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
  // 참고 링크 - https://rateye.tistory.com/468
  const emailRegExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (!emailRegExp.test(email)) {
    throw new Error(ERROR_MESSAGE.WRONG_FORMAT_EMAIL);
  }
};
