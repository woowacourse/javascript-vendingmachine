import { AUTH_URL_BASE, ERROR_MESSAGE, POST_REQUEST_OPTIONS } from '../constants';
import { SavedUserData, UserRegisterData, UserUpdateData } from './interface';
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
    this.#userId = null;
    this.#name = null;
    this.#email = null;

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

  async register(userInputData: UserRegisterData) {
    this.#validateRegisterData(userInputData);

    const registerData = userInputData;
    delete registerData.passwordConfirm;

    const response = await fetch(`${AUTH_URL_BASE}/users`, {
      ...POST_REQUEST_OPTIONS,
      body: JSON.stringify(registerData),
    });

    if (!response.ok) await this.#handleServerError(response);

    const {
      user: { id: userId, name, email },
    } = await response.json();

    this.#saveUserData({ userId, name, email });
    this.#isLoggedIn = true;
  }

  async update(userInputData: UserUpdateData) {
    this.#validateUpdateData(userInputData);
    const response = await fetch(`${AUTH_URL_BASE}/users/${this.#userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInputData),
    });

    if (!response.ok) await this.#handleServerError(response);

    const { id: userId, name, email } = await response.json();

    this.#saveUserData({ userId, name, email });
  }

  async login(userInputData) {
    const response = await fetch(`${AUTH_URL_BASE}/login`, {
      ...POST_REQUEST_OPTIONS,
      body: JSON.stringify(userInputData),
    });

    if (!response.ok) await this.#handleServerError(response);

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

  async #handleServerError(response) {
    const rejectMessage = await response.json();
    if (rejectMessage === 'Email already exists') {
      throw new Error(ERROR_MESSAGE.USER_DATA.DUPLICATE_EMAIL);
    }

    if (rejectMessage === 'Cannot find user' || rejectMessage === 'Incorrect password') {
      throw new Error(ERROR_MESSAGE.USER_DATA.INCORRECT_LOGIN_DATA);
    }

    throw new Error(ERROR_MESSAGE.USER_DATA.SERVER_FAILURE);
  }

  #getUserData() {
    const savedUserData = JSON.parse(window.sessionStorage.getItem('userData'));

    if (!savedUserData) return;

    const { userId, name, email } = savedUserData;

    this.#userId = userId;
    this.#name = name;
    this.#email = email;
  }

  #saveUserData({ userId, name, email }: SavedUserData) {
    window.sessionStorage.setItem('userData', JSON.stringify({ userId, name, email }));

    this.#userId = userId;
    this.#name = name;
    this.#email = email;
  }

  #validateRegisterData(registerData: UserRegisterData) {
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

  #validateUpdateData(updateData: UserUpdateData) {
    const updateDataValidator = [
      {
        testFunc: isOutOfRangeUserNameLength,
        errorMsg: ERROR_MESSAGE.USER_DATA.NAME_LENGTH_OUT_OF_RANGE,
      },
    ];
    if (updateData.password) {
      updateDataValidator.push(
        {
          testFunc: isInvalidPassword,
          errorMsg: ERROR_MESSAGE.USER_DATA.INVALID_PASSWORD,
        },
        {
          testFunc: isDifferentPassword,
          errorMsg: ERROR_MESSAGE.USER_DATA.NO_MATCH_PASSWORD,
        }
      );
    }
    validateData(updateData, updateDataValidator);
  }
}
