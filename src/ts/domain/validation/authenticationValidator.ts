import { AuthenticationInfo, TestCase } from '../../types';
import { AUTHENTICATION_INFO } from '../../constant/rule';
import { AUTHENTICATION_MESSAGE } from '../../constant/errorMessage';
import {
  EMAIL_REGEX,
  NUMBER_REGEX,
  ALPHABET_REGEX,
  PASSWORD_SPECIAL_CHARACTER_REGEX,
  PASSWORD_OTHER_CHARACTERS_REGEX,
} from '../../constant/regex';

const isNotEmailFormat = ({ email }: AuthenticationInfo): boolean => {
  return !EMAIL_REGEX.test(email);
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
  return !NUMBER_REGEX.test(password);
};

const isNotExistAlphabetInPassword = ({ password }: AuthenticationInfo): boolean => {
  return !ALPHABET_REGEX.test(password);
};

const isNotExistSpecialCharacterInPassword = ({ password }: AuthenticationInfo): boolean => {
  return !PASSWORD_SPECIAL_CHARACTER_REGEX.test(password);
};

const isExistOtherCharacterInPassword = ({ password }: AuthenticationInfo): boolean => {
  return PASSWORD_OTHER_CHARACTERS_REGEX.test(password);
};

const isDifferentVerificationPassword = ({
  password,
  verificationPassword,
}: AuthenticationInfo): boolean => {
  return password !== verificationPassword;
};

export const loginInputTestCases: TestCase[] = [
  {
    testCase: isNotEmailFormat,
    errorMessage: AUTHENTICATION_MESSAGE.NOT_EMAIL_FORMAT,
  },
];

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

export const editUserInfoInputTestCases: TestCase[] = [
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
