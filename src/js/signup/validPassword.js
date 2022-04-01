import { isSame } from '../utils/common';

export const validPassword = (password, passwordCheck) => {
  if (!isSame(password, passwordCheck)) {
    throw new Error('비밀번호와 비밀번호 확인이 일치하지않습니다.');
  }
  return true;
};
