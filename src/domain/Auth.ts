import { API_URL, AUTH_CONDITION, ERROR_MESSAGE } from '../utils/constants';
import { UserInfoProps } from '../utils/interface';

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

    if (response.status === 400) throw new Error('같은 이메일이 존재합니다');
  }

  login = async (loginInfo: loginInfoProps) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });

    if (!response.ok) {
      throw new Error('아이디와 비밀번호를 확인해주세요~');
    }

    const json = await response.json();

    return json;
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

    if (!response.ok) {
      throw new Error('아이디와 비밀번호를 확인해주세요~');
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  isValidatedName(name: string): true | Error {
    if (
      name.length < AUTH_CONDITION.MIN_USER_NAME_LENGTH ||
      name.length > AUTH_CONDITION.MAX_USER_NAME_LENGTH
    )
      throw Error(ERROR_MESSAGE.INVALID_USER_NAME_LENGTH);

    return true;
  }

  isValidatedPassword(password: string, passwordConfirmation: string): true | Error {
    // 8~16자, 최소 영어, 숫자, 특수문자 포함
    const passwordRegExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;

    if (!passwordRegExp.test(password)) throw Error(ERROR_MESSAGE.INVALID_USER_PASSWORD);

    if (password !== passwordConfirmation) throw Error('비밀번호가 같지 않습니다.');

    return true;
  }
}
