import { AUTH_URL_BASE, ERROR_MESSAGE, POST_REQUEST_OPTIONS } from '../constants';
import {
  hasEmptyInput,
  isDifferentPassword,
  isInvalidPassword,
  isOutOfRangeUserNameLength,
  validateData,
} from './validator';

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
    this.#validateRegisterData(userInputData);

    const registerData = userInputData;
    delete registerData.passwordConfirm;

    const response = await fetch(`${AUTH_URL_BASE}/users`, {
      ...POST_REQUEST_OPTIONS,
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const rejectMessage = await response.json();
      if (rejectMessage === 'Email already exists') {
        throw new Error(ERROR_MESSAGE.USER_DATA.DUPLICATE_EMAIL);
      }
      throw new Error(ERROR_MESSAGE.USER_DATA.SERVER_FAILURE);
    }

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

  #validateRegisterData(registerData) {
    const registerDataValidator = [
      {
        testFunc: hasEmptyInput,
        errorMsg: ERROR_MESSAGE.USER_DATA.MISSING_REQUIRED_DATA,
      },
      {
        testFunc: isOutOfRangeUserNameLength,
        errorMsg: ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE,
      },
      { testFunc: isInvalidPassword, errorMsg: ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD },
      {
        testFunc: isDifferentPassword,
        errorMsg: ERROR_MESSAGE.USER_DATA.NO_MATCH_PASSWORD,
      },
    ];

    validateData(registerData, registerDataValidator);
  }
}
