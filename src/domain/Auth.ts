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

  async signup(signupInfo: UserInfoProps) {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupInfo),
    });

    validator([
      {
        checker: () => response.status === 400,
        errorMessage: ERROR_MESSAGE.SAME_EMAIL_EXIST,
      },
    ]);
  }

  login = async (loginInfo: loginInfoProps) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });

    validator([
      {
        checker: () => !response.ok,
        errorMessage: ERROR_MESSAGE.INCORRECT_USER_ID_AND_PASSWORD,
      },
    ]);

    const userInfo = await response.json();

    return userInfo;
  };

  async edit(editedUserInfo: UserInfoProps) {
    const accessToken = localStorage.getItem('accessToken');
    const { id } = JSON.parse(localStorage.getItem('user'));

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(editedUserInfo),
    });

    validator([
      {
        checker: () => !response.ok,
        errorMessage: ERROR_MESSAGE.INCORRECT_USER_ID_AND_PASSWORD,
      },
    ]);
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
