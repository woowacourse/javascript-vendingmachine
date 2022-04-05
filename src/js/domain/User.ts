import UserApi from '../api/user.js';
import { getCookie, setCookie, expireCookie } from '../utils/cookie.js';

export default class User {
  #accessToken;
  #isLogined;
  #id;
  #name;
  #email;

  constructor() {
    this.#accessToken = getCookie('accessToken');
    this.#isLogined = false;
    this.#name = null;
    this.#email = null;
    this.#initLoginStatus();
  }

  get isLogined() {
    return this.#isLogined;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  #initLoginStatus() {
    if (this.#accessToken) {
      UserApi.searchInfo(this.#accessToken)
        .then((res) => {
          this.#isLogined = true;
          this.#id = res.id;
          this.#email = res.email;
          this.#name = res.name;
        })
        .catch(() => {
          expireCookie('accessToken');
          this.#isLogined = false;
          this.#id = null;
        });
    }
  }

  async signIn(email, password) {
    const { accessToken } = await UserApi.signIn(email, password);
    this.#isLogined = true;
    setCookie('accessToken', accessToken);
  }

  async signUp(email, name, password) {
    const { accessToken } = await UserApi.signUp(email, name, password);
    this.#isLogined = true;
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
