import { ERROR_MESSAGE } from '../constants/constants';
import { isSame } from '../utils/common';

export const validPassword = (password, passwordCheck) => {
  if (!isSame(password, passwordCheck)) {
    throw new Error(ERROR_MESSAGE.NOT_MATCH_PASSWORD);
  }
  return true;
};

export const validEmail = (dataResult) => {
  if (!dataResult.accessToken) {
    throw new Error('이미 계정이 존재하는 이메일입니다.');
  }
  return true;
};
