import { API_URL, AUTH_CONDITION, ERROR_MESSAGE } from '../utils/constants';
import { UserInfoProps } from '../utils/interface';
import { validator } from '../utils/validator';

type loginInfoProps = Omit<UserInfoProps, 'name'>;

interface AuthInterface {
  signup(signupInfo: UserInfoProps);
  login(loginInfo: loginInfoProps);
  edit(editedUserInfo: UserInfoProps);
  isValidatedName(name: string): true | Error;
  isValidatedPassword(password: string, passwordConfirmation: string): true | Error;
}

export class Auth implements AuthInterface {
  constructor() {}

  async #fetcher({ method, path, headers, bodyData, errorMessage }) {
    const response = await fetch(`${API_URL + path}`, {
      method,
      headers,
      body: JSON.stringify(bodyData),
    });

    validator([
      {
        checker: () => !response.ok,
        errorMessage,
      },
    ]);

    return response.json();
  }

  signup(signupInfo: UserInfoProps) {
    return this.#fetcher({
      method: 'POST',
      path: '/signup',
      headers: {
        'Content-Type': 'application/json',
      },
      bodyData: signupInfo,
      errorMessage: ERROR_MESSAGE.SAME_EMAIL_EXIST,
    });
  }

  login(loginInfo: loginInfoProps) {
    return this.#fetcher({
      method: 'POST',
      path: '/login',
      headers: {
        'Content-Type': 'application/json',
      },
      bodyData: loginInfo,
      errorMessage: ERROR_MESSAGE.INCORRECT_USER_ID_AND_PASSWORD,
    });
  }

  edit(editedUserInfo: UserInfoProps) {
    const accessToken = localStorage.getItem('accessToken');
    const { id } = JSON.parse(localStorage.getItem('user'));

    return this.#fetcher({
      method: 'PATCH',
      path: `/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      bodyData: editedUserInfo,
      errorMessage: ERROR_MESSAGE.INCORRECT_USER_ID_AND_PASSWORD,
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  isValidatedName(name: string): true | Error {
    validator([
      {
        checker: () =>
          name.length < AUTH_CONDITION.MIN_USER_NAME_LENGTH ||
          name.length > AUTH_CONDITION.MAX_USER_NAME_LENGTH,
        errorMessage: ERROR_MESSAGE.INVALID_USER_NAME_LENGTH,
      },
    ]);

    return true;
  }

  isValidatedPassword(password: string, passwordConfirmation: string): true | Error {
    // 8~16자, 최소 영어, 숫자, 특수문자 포함
    const passwordRegExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    validator([
      {
        checker: () => !passwordRegExp.test(password),
        errorMessage: ERROR_MESSAGE.INVALID_USER_PASSWORD,
      },
      {
        checker: () => password !== passwordConfirmation,
        errorMessage: ERROR_MESSAGE.NOT_SAME_PASSWORD,
      },
    ]);

    return true;
  }
}
