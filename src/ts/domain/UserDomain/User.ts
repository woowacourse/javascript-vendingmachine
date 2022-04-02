import { UserInfo } from '../types';

export default class UserDomain {
  #accessToken: string;
  #userInfo: UserInfo;
  isSignIn = false;

  get userInfo() {
    return this.#userInfo;
  }

  get accessToken() {
    return this.#accessToken;
  }

  signIn(user: UserInfo, accessToken) {
    this.isSignIn = true;
    this.#userInfo = user;
    this.#accessToken = accessToken;
  }

  signOut() {
    this.isSignIn = false;
    this.#userInfo = { email: '', name: '', password: '' };
    this.#accessToken = '';
  }
}
