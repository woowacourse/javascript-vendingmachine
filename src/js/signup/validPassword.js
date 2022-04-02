import { ERROR_MESSAGE } from '../constants/constants';
import { isSame } from '../utils/common';

export const validPassword = (password, passwordCheck) => {
  if (!isSame(password, passwordCheck)) {
    throw new Error(ERROR_MESSAGE.NOT_MATCH_PASSWORD);
  }
  return true;
};
