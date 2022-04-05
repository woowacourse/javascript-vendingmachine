import UserApi from '../api/user.js';
import { getCookie, setCookie, expireCookie } from '../utils/cookie.js';

export default class User {
  #accessToken;
  #isLogined;
  #id;

  constructor() {
    this.#accessToken = getCookie('accessToken');
    this.#isLogined = false;
    this.#initLoginStatus();
  }

  get isLogined() {
    return this.#isLogined;
  }

  #initLoginStatus() {
    if (this.#accessToken) {
      UserApi.searchInfo(this.#accessToken)
        .then((res) => {
          this.#isLogined = true;
          this.#id = res.id;
        })
        .catch((e) => {
          expireCookie('accessToken');
          this.#isLogined = false;
          this.#id = null;
        });
    }
  }

  async signIn(email, password) {
    const { accessToken } = await UserApi.signIn(email, password);
    setCookie('accessToken', accessToken);
  }

  async signUp(email, name, password) {
    const { accessToken } = await UserApi.signUp(email, name, password);
    setCookie('accessToken', accessToken);
  }

  async userInfo() {
    const { email, name, id } = await UserApi.searchInfo(this.#accessToken);
    this.#id = id;
    return { email, name };
  }

  async updateUser(email, name, password) {
    const { id } = await UserApi.signIn(this.#accessToken, this.#id, {
      email,
      name,
      password,
    });
    this.#id = id;
  }
}
