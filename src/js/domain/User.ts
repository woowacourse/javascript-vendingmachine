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

  init() {
    this.#accessToken = null;
    this.#isLogined = false;
    this.#name = null;
    this.#email = null;
  }

  async initLoginStatus() {
    if (this.#accessToken) {
      try {
        const res = await UserApi.searchInfo(this.#accessToken);
        this.#isLogined = true;
        this.#id = res.id;
        this.#email = res.email;
        this.#name = res.name;
      } catch {
        expireCookie('accessToken');
        this.#isLogined = false;
        this.#id = null;
      }
    }
  }

  async signIn(email, password) {
    const {
      accessToken,
      user: { name, id },
    } = await UserApi.signIn(email, password);
    this.#id = id;
    this.#email = email;
    this.#name = name;
    this.#isLogined = true;
    setCookie('accessToken', accessToken);
  }

  async signUp(email, name, password) {
    const {
      accessToken,
      user: { id },
    } = await UserApi.signUp(email, name, password);
    this.#isLogined = true;
    this.#id = id;
    this.#email = email;
    this.#name = name;
    setCookie('accessToken', accessToken);
  }

  async userInfo() {
    const { email, name, id } = await UserApi.searchInfo(this.#accessToken);
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  async updateUser(email, name, password) {
    const {
      id,
      email: newEmail,
      name: newName,
    } = await UserApi.update(this.#accessToken, this.#id, {
      email,
      name,
      password,
    });
    this.#id = id;
    this.#email = newEmail;
    this.#name = newName;
  }
}
