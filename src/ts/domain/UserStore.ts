import {
  AuthenticationInfo,
  TestCase,
  ValidationInfo,
  UserInfo,
  UserStoreInterface,
} from '../types';
import {
  loginInputTestCases,
  userInfoInputTestCases,
  editUserInfoInputTestCases,
} from './validation/authenticationValidator';
import { requestRegister, requestLogin, requestEditUserInfo } from '../apis';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
import { COOKIE_KEY } from '../constant/cookie';

class UserStore implements UserStoreInterface {
  private userInfo: UserInfo = null;

  constructor() {
    this.userInfo = this.getUserInfoCookie();
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }

  async register(registerInfo: AuthenticationInfo) {
    await requestRegister(registerInfo);
  }

  async login(loginInfo: AuthenticationInfo) {
    const response = await requestLogin(loginInfo);

    this.userInfo = {
      accessToken: response.accessToken,
      ...response.user,
    };

    setCookie(COOKIE_KEY.USER_INFO, JSON.stringify(this.userInfo));
  }

  async editUserInfo(editedUserInfo: AuthenticationInfo) {
    const response = await requestEditUserInfo(
      editedUserInfo,
      this.userInfo.id,
      this.userInfo.accessToken
    );

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

  validateLoginInput(loginInfo: AuthenticationInfo): void {
    this.validateTestCase(loginInputTestCases, loginInfo);
  }

  validateUserInfoInput(inputtedUserInfo: AuthenticationInfo): void {
    this.validateTestCase(userInfoInputTestCases, inputtedUserInfo);
  }

  validateEditUserInfoInput(editUserInfoInput: AuthenticationInfo): void {
    this.validateTestCase(editUserInfoInputTestCases, editUserInfoInput);
  }

  private validateTestCase(testCases: TestCase[], validationInfo: ValidationInfo) {
    testCases.every(({ testCase, errorMessage }) => {
      if (testCase(validationInfo)) throw new Error(errorMessage);
      return true;
    });
  }

  private getUserInfoCookie() {
    const userInfoCookie: string | undefined = getCookie(COOKIE_KEY.USER_INFO);

    return userInfoCookie ? JSON.parse(userInfoCookie) : null;
  }
}

export default UserStore;
