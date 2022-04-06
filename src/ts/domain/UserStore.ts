import {
  AuthenticationInfo,
  TestCase,
  ValidationInfo,
  UserInfo,
  UserStoreInterface,
} from '../types';
import { AUTHENTICATION_MESSAGE } from '../constant/errorMessage';
import { AUTHENTICATION_INFO } from '../constant/rule';
import { request } from '../utils/index';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import { COOKIE_KEY } from '../constant/cookie';

class UserStore implements UserStoreInterface {
  private userInfo: UserInfo = null;

  private loginInputTestCases: TestCase[] = [
    {
      testCase: this.isNotEmailFormat,
      errorMessage: AUTHENTICATION_MESSAGE.NOT_EMAIL_FORMAT,
    },
  ];

  private userInfoInputTestCases: TestCase[] = [
    {
      testCase: this.isNotEmailFormat,
      errorMessage: AUTHENTICATION_MESSAGE.NOT_EMAIL_FORMAT,
    },
    {
      testCase: this.isInvalidNameLength,
      errorMessage: AUTHENTICATION_MESSAGE.EXCEED_NAME_LENGTH_RANGE,
    },
    {
      testCase: this.isInvalidPasswordLength,
      errorMessage: AUTHENTICATION_MESSAGE.EXCEED_PASSWORD_LENGTH_RANGE,
    },
    {
      testCase: this.isNotExistNumberInPassword,
      errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
    },
    {
      testCase: this.isNotExistAlphabetInPassword,
      errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
    },
    {
      testCase: this.isNotExistSpecialCharacterInPassword,
      errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
    },
    {
      testCase: this.isExistOtherCharacterInPassword,
      errorMessage: AUTHENTICATION_MESSAGE.NOT_PASSWORD_FORMAT,
    },
    {
      testCase: this.isDifferentVerificationPassword,
      errorMessage: AUTHENTICATION_MESSAGE.DIFFERENT_VERIFICATION_PASSWORD,
    },
  ];

  constructor() {
    this.userInfo = this.getUserInfoCookie();
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }

  async register(registerInfo: AuthenticationInfo) {
    await request('http://localhost:3000/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: registerInfo.email,
        password: registerInfo.password,
        name: registerInfo.name,
      }),
    });
  }

  async login(loginInfo: AuthenticationInfo) {
    const response = await request('http://localhost:3000/login', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: loginInfo.email,
        password: loginInfo.password,
      }),
    });

    this.userInfo = {
      accessToken: response.accessToken,
      ...response.user,
    };

    setCookie(COOKIE_KEY.USER_INFO, JSON.stringify(this.userInfo));
  }

  async editUserInfo(editedUserInfo: AuthenticationInfo) {
    const response = await request(`http://localhost:3000/600/users/${this.userInfo.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.userInfo.accessToken}`,
      },
      method: 'PUT',
      body: JSON.stringify({
        email: editedUserInfo.email,
        password: editedUserInfo.password,
        name: editedUserInfo.name,
      }),
    });

    this.userInfo = {
      ...this.userInfo,
      ...response,
    };

    setCookie(COOKIE_KEY.USER_INFO, JSON.stringify(this.userInfo));
  }

  logout(): void {
    this.userInfo = null;
    deleteCookie(COOKIE_KEY.USER_INFO);
  }

  validateTestCase(testCases: TestCase[], validationInfo: ValidationInfo) {
    testCases.every(({ testCase, errorMessage }) => {
      if (testCase(validationInfo)) throw new Error(errorMessage);
      return true;
    });
  }

  validateLoginInput(loginInfo: AuthenticationInfo): void {
    this.validateTestCase(this.loginInputTestCases, loginInfo);
  }

  validateUserInfoInput(inputedUserInfo: AuthenticationInfo): void {
    this.validateTestCase(this.userInfoInputTestCases, inputedUserInfo);
  }

  validateEditUserInfoInput: (editUserInfoInput: AuthenticationInfo) => void;

  private getUserInfoCookie() {
    const userInfoCookie: string | undefined = getCookie(COOKIE_KEY.USER_INFO);

    return userInfoCookie ? JSON.parse(userInfoCookie) : null;
  }

  private isNotEmailFormat({ email }: AuthenticationInfo): boolean {
    const emailRegex = /[0-9a-zA-Z]+@([0-9a-zA-Z]+)(.[0-9a-zA-Z]+){1,2}$/;

    return !emailRegex.test(email);
  }

  private isInvalidNameLength({ name }: AuthenticationInfo): boolean {
    return (
      name.length < AUTHENTICATION_INFO.MIN_NAME_LENGTH ||
      name.length > AUTHENTICATION_INFO.MAX_NAME_LENGTH
    );
  }

  private isInvalidPasswordLength({ password }: AuthenticationInfo): boolean {
    return (
      password.length < AUTHENTICATION_INFO.MIN_PASSWORD_LENGTH ||
      password.length > AUTHENTICATION_INFO.MAX_PASSWORD_LENGTH
    );
  }

  private isNotExistNumberInPassword({ password }: AuthenticationInfo): boolean {
    const numberRegex = /[0-9]/;

    return !numberRegex.test(password);
  }

  private isNotExistAlphabetInPassword({ password }: AuthenticationInfo): boolean {
    const alphabetRegex = /[a-zA-Z]/;

    return !alphabetRegex.test(password);
  }

  private isNotExistSpecialCharacterInPassword({ password }: AuthenticationInfo): boolean {
    const specialCharactersRegex = /[!#$%&()*+,-./:;<=>?@]/;

    return !specialCharactersRegex.test(password);
  }

  private isExistOtherCharacterInPassword({ password }: AuthenticationInfo): boolean {
    const otherCharacterRegex = /[^0-9a-zA-Z!#$%&()*+,-./:;<=>?@]/;

    return otherCharacterRegex.test(password);
  }

  private isDifferentVerificationPassword({
    password,
    verificationPassword,
  }: AuthenticationInfo): boolean {
    return password !== verificationPassword;
  }
}

export default UserStore;
