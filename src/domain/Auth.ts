import { AUTH_CONDITION, ERROR_MESSAGE } from '../utils/constants';

interface AuthInterface {
  signup();
  login();
  isValidatedName(name: string): true | Error;
  isValidatedPassword(password: string): true | Error;
}

export class Auth implements AuthInterface {
  #signupButton: HTMLButtonElement;

  constructor() {
    /**
     * 임시 시작
     */
    // this.#signupButton = document.querySelector('#signup');
    // this.#signupButton.addEventListener('click', this.signup);
    /**
     * 임시 끝
     */
  }

  signup = async () => {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'sam4606@naver.com',
        password: '123456',
      }),
    });

    if (response.ok) {
      const json = await response.json();
    }
  };

  login = async () => {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'sam4606@naver.com',
        password: '123456',
      }),
    });

    if (response.ok) {
      const json = await response.json();
    }
  };

  logout() {
    localStorage.removeItem('accessToken');
  }

  isValidatedName(name: string): true | Error {
    if (
      name.length < AUTH_CONDITION.MIN_USER_NAME_LENGTH ||
      name.length > AUTH_CONDITION.MAX_USER_NAME_LENGTH
    )
      throw Error(ERROR_MESSAGE.INVALID_USER_NAME_LENGTH);

    return true;
  }

  isValidatedPassword(password: string): true | Error {
    // 8~16자, 최소 영어, 숫자, 특수문자 포함
    const passwordRegExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    if (!passwordRegExp.test(password)) throw Error(ERROR_MESSAGE.INVALID_USER_PASSWORD);

    return true;
  }
}
