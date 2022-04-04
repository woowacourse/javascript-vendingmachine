import { USER_INFO_RULE } from '../../constants';
import { MESSAGE } from '../../constants/message';
import { UserInfo } from '../types';

const validateUserInfo = (user: UserInfo, confirmPassword: string) => {
  const { email, name, password } = user;
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MIN_PASSWORD_LENGTH } =
    USER_INFO_RULE;

  if (!email || !name || !password || !confirmPassword) {
    throw new Error(MESSAGE.ERROR_USER_INFO_EMPTY);
  }
  if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
    throw new Error(MESSAGE.ERROR_USER_NAME_LENGTH);
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(MESSAGE.ERROR_USER_PASSWORD_LENGTH);
  }
  if (password !== confirmPassword) {
    throw new Error(MESSAGE.ERROR_USER_CONFIRM_PASSWORD);
  }
};

export { validateUserInfo };
