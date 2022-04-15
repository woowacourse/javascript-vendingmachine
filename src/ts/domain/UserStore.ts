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
import { getCookie } from '../utils/cookie';
import { COOKIE_KEY } from '../constant/cookie';

class UserStore implements UserStoreInterface {
  private userInfo: UserInfo = null;

  constructor() {
    this.userInfo = this.getUserInfoCookie();
  }

  getUserInfo(): UserInfo {
    return this.userInfo;
  }

  setUserInfo(userInfo: UserInfo) {
    this.userInfo = userInfo;
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
