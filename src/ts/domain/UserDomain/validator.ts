import { USER_INFO_RULE } from '../../constants';
import { MESSAGE } from '../../constants/message';
import { UserInfo } from '../types';

const isEmptyValue = (user: UserInfo, confirmPassword: string) => {
  const { email, name, password } = user;
  return !email || !name || !password || !confirmPassword;
};

const isNameLengthRanged = (name: string) => {
  const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = USER_INFO_RULE;
  return name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH;
};

const isPasswordLengthRanged = (password: string) => {
  return password.length < USER_INFO_RULE.MIN_PASSWORD_LENGTH;
};

const isDifferentPassword = (password: string, confirmPassword: string) => {
  return password !== confirmPassword;
};

interface Validator {
  test: boolean;
  errorMsg: string;
}

const generateUserInfoValidators = (
  user: UserInfo,
  confirmPassword: string,
): Validator[] => [
  {
    test: isEmptyValue(user, confirmPassword),
    errorMsg: MESSAGE.ERROR_USER_INFO_EMPTY,
  },
  {
    test: isNameLengthRanged(user.name),
    errorMsg: MESSAGE.ERROR_USER_NAME_LENGTH,
  },
  {
    test: isPasswordLengthRanged(user.password),
    errorMsg: MESSAGE.ERROR_USER_PASSWORD_LENGTH,
  },
  {
    test: isDifferentPassword(user.password, confirmPassword),
    errorMsg: MESSAGE.ERROR_USER_CONFIRM_PASSWORD,
  },
];

const validateUserInfo = (user: UserInfo, confirmPassword: string) => {
  const validator = generateUserInfoValidators(user, confirmPassword);

  return validator.every(({ test, errorMsg }) => {
    if (test) {
      throw new Error(errorMsg);
    }
    return true;
  });
};

export { validateUserInfo };
