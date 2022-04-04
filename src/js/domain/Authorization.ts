import { AUTH_URL_BASE, POST_REQUEST_OPTIONS } from '../constants';

export default class Authorization {
  #isLoggedIn;
  #userId;
  #name;
  #email;

  constructor() {
    this.#getUserData();
    this.#isLoggedIn = !!this.#userId;
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  async register(userInputData) {
    const response = await fetch(`${AUTH_URL_BASE}/users`, {
      ...POST_REQUEST_OPTIONS,
      body: JSON.stringify(userInputData),
    });

    const {
      user: { id: userId, name, email },
    } = await response.json();

    this.#saveUserData({ userId, name, email });
    this.#isLoggedIn = true;
  }

  async update(userInputData) {
    const response = await fetch(`${AUTH_URL_BASE}/users/${this.#userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInputData),
    });

    const { id: userId, name, email } = await response.json();

    this.#saveUserData({ userId, name, email });
    this.#isLoggedIn = true;
  }

  async login(userInputData) {
    const response = await fetch(`${AUTH_URL_BASE}/login`, {
      ...POST_REQUEST_OPTIONS,
      body: JSON.stringify(userInputData),
    });

    const {
      user: { id: userId, name, email },
    } = await response.json();

    this.#saveUserData({ userId, name, email });
    this.#isLoggedIn = true;
  }

  logout() {
    window.sessionStorage.removeItem('userData');

    this.#userId = null;
    this.#isLoggedIn = false;
  }

  #getUserData() {
    const savedUserData = JSON.parse(window.sessionStorage.getItem('userData'));

    if (!savedUserData) return;

    const { userId, name, email } = savedUserData;

    this.#userId = userId;
    this.#name = name;
    this.#email = email;
  }

  #saveUserData({ userId, name, email }) {
    window.sessionStorage.setItem('userData', JSON.stringify({ userId, name, email }));

    this.#userId = userId;
    this.#name = name;
    this.#email = email;
  }
}
