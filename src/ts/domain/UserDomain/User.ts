import { UserInfo } from '../types';

export default class UserDomain {
  #accessToken: string;
  #userInfo: UserInfo;
  isLogin = false;

  get userInfo() {
    return this.#userInfo;
  }

  get accessToken() {
    return this.#accessToken;
  }

  login(user: UserInfo, accessToken) {
    this.isLogin = true;
    this.#userInfo = user;
    this.#accessToken = accessToken;
  }

  logout() {
    this.isLogin = false;
    this.#userInfo = { email: '', name: '', password: '' };
    this.#accessToken = '';
  }
}
