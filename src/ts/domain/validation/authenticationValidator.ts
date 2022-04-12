import { AuthenticationInfo, TestCase } from '../../types';
import { AUTHENTICATION_INFO } from '../../constant/rule';
import { AUTHENTICATION_MESSAGE } from '../../constant/errorMessage';

const isNotEmailFormat = ({ email }: AuthenticationInfo): boolean => {
  const emailRegex = /[0-9a-zA-Z]+@([0-9a-zA-Z]+)(.[0-9a-zA-Z]+){1,2}$/;

  return !emailRegex.test(email);
};

const isInvalidNameLength = ({ name }: AuthenticationInfo): boolean => {
  return (
    name.length < AUTHENTICATION_INFO.MIN_NAME_LENGTH ||
    name.length > AUTHENTICATION_INFO.MAX_NAME_LENGTH
  );
};

const isInvalidPasswordLength = ({ password }: AuthenticationInfo): boolean => {
  return (
    password.length < AUTHENTICATION_INFO.MIN_PASSWORD_LENGTH ||
    password.length > AUTHENTICATION_INFO.MAX_PASSWORD_LENGTH
  );
};

const isNotExistNumberInPassword = ({ password }: AuthenticationInfo): boolean => {
  const numberRegex = /[0-9]/;

  return !numberRegex.test(password);
};

const isNotExistAlphabetInPassword = ({ password }: AuthenticationInfo): boolean => {
  const alphabetRegex = /[a-zA-Z]/;

  return !alphabetRegex.test(password);
};

const isNotExistSpecialCharacterInPassword = ({ password }: AuthenticationInfo): boolean => {
  const specialCharactersRegex = /[!#$%&()*+,-./:;<=>?@]/;

  return !specialCharactersRegex.test(password);
};

const isExistOtherCharacterInPassword = ({ password }: AuthenticationInfo): boolean => {
  const otherCharacterRegex = /[^0-9a-zA-Z!#$%&()*+,-./:;<=>?@]/;

  return otherCharacterRegex.test(password);
};

const isDifferentVerificationPassword = ({
  password,
  verificationPassword,
}: AuthenticationInfo): boolean => {
  return password !== verificationPassword;
};

export const userInfoInputTestCases: TestCase[] = [
  {
    testCase: isNotEmailFormat,
    errorMessage: AUTHENTICATION_MESSAGE.NOT_EMAIL_FORMAT,
  },
  {
    testCase: isInvalidNameLength,
    errorMessage: AUTHENTICATION_MESSAGE.EXCEED_NAME_LENGTH_RANGE,
  },
  {
    testCase: isInvalidPasswordLength,
    errorMessage: AUTHENTICATION_MESSAGE.EXCEED_PASSWORD_LENGTH_RANGE,
  },
  {
    testCase: isNotExistNumberInPassword,
    errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
  },
  {
    testCase: isNotExistAlphabetInPassword,
    errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
  },
  {
    testCase: isNotExistSpecialCharacterInPassword,
    errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
  },
  {
    testCase: isExistOtherCharacterInPassword,
    errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
  },
  {
    testCase: isDifferentVerificationPassword,
    errorMessage: AUTHENTICATION_MESSAGE.DIFFERENT_VERIFICATION_PASSWORD,
  },
];

export const loginInputTestCases: TestCase[] = [
  {
    testCase: isNotEmailFormat,
    errorMessage: AUTHENTICATION_MESSAGE.NOT_EMAIL_FORMAT,
  },
];
