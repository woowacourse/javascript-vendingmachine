import {
  ACCESS_TOKEN,
  AUTH_URL_BASE,
  ERROR_MESSAGE,
  POST_REQUEST_OPTIONS,
} from '../constants';
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
  #accessToken;

  constructor() {
    this.#userId = null;
    this.#name = null;
    this.#email = null;
    this.#accessToken = this.#getAccessToken();

    this.#getUserData();

    this.#isLoggedIn = !!this.#userId && !!this.#accessToken;
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
      accessToken,
      user: { id: userId, name, email },
    } = await response.json();

    this.#saveUserData({ accessToken, userId, name, email });
    this.#isLoggedIn = true;
  }

  async update(userInputData: UserUpdateData) {
    this.#validateUpdateData(userInputData);

    const updateData = userInputData;
    delete updateData.passwordConfirm;

    console.log(this.#accessToken);

    const response = await fetch(`${AUTH_URL_BASE}/users/${this.#userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.#accessToken}`,
      },
      body: JSON.stringify(updateData),
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
      accessToken,
      user: { id: userId, name, email },
    } = await response.json();

    this.#saveUserData({ accessToken, userId, name, email });
    this.#isLoggedIn = true;
  }

  logout() {
    window.sessionStorage.removeItem('userData');

    document.cookie = `${ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    this.#userId = null;
    this.#name = null;
    this.#email = null;
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

    this.#saveUserData({ userId, name, email });
  }

  #saveUserData({ accessToken, userId, name, email }: SavedUserData) {
    window.sessionStorage.setItem('userData', JSON.stringify({ userId, name, email }));

    if (accessToken) document.cookie = `${ACCESS_TOKEN}=${accessToken}`;

    this.#userId = userId;
    this.#name = name;
    this.#email = email;
  }

  #getAccessToken() {
    const accessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith(ACCESS_TOKEN))
      ?.split('=')[1];

    console.log(accessToken);

    return accessToken;
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
