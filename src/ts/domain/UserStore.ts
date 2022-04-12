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
import { request } from '../utils/index';
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
    await request(`${API_HOST}/register`, {
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
    const response = await request(`${API_HOST}/login`, {
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
    const response = await request(`${API_HOST}/600/users/${this.userInfo.id}`, {
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
