import { UserInfo } from '../types';
import { requestSign, requestUpdate } from './request';

export default class UserDomain {
  #accessToken: string;
  #userInfo: UserInfo;
  #isSignIn = false;

  get userInfo() {
    return this.#userInfo;
  }

  get accessToken() {
    return this.#accessToken;
  }

  get isSignIn() {
    return this.#isSignIn;
  }

  async signUp(user: UserInfo) {
    await requestSign('signup', user);
  }

  async signIn(user: UserInfo) {
    await requestSign('signin', user).then(response => {
      this.#isSignIn = true;
      this.#userInfo = response.user;
      this.#accessToken = response.accessToken;
    });
  }

  async editUserInfo(user: UserInfo) {
    await requestUpdate(user, this.#userInfo.id).then(response => {
      this.#userInfo = response;
    });
  }

  signOut() {
    this.#isSignIn = false;
    this.#userInfo = { email: '', name: '', password: '' };
    this.#accessToken = '';
  }
}
