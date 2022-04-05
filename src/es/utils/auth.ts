import User from '../data/User';
import { IUser } from '../interface';
import { loadMainPage } from '../routes';
import { showSnackBar } from './index';

interface SignInfo {
  email: string;
  password: string;
  name? :string;
}

interface AuthInfo {
  accessToken: string,
  id: number
  expiration: number,
}

const devURL = 'http://localhost:3000/';
const deployURL = 'https://soyi47-auth-server.herokuapp.com/';

const currentAuthServer = devURL;

const signUpURL = `${currentAuthServer}signup/`;
const loginURL = `${currentAuthServer}login/`;
const userInfoURL = (id) => `${currentAuthServer}600/users/${id}`;

function signUp(signUpInfo: SignInfo) {
  fetch(signUpURL, {
    method: 'POST',
    body: JSON.stringify(signUpInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async res => {
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message.slice(1, -1));
    }
    return res.json();
  })
    .then(response => {
      const { id, email, name }: IUser = response.user;
      const userAuth: AuthInfo = {
        accessToken: response.accessToken,
        id,
        expiration: Date.now() + 1000 * 60 * 60,
      };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      User.setUser({ id, email, name });
      loadMainPage();
    })
    .catch(err => {
      if (err.message === 'Email already exists') {
        showSnackBar('이미 가입한 이메일입니다.');
      }
    });
}

function login(loginInfo: SignInfo) {
  fetch(loginURL, {
    method: 'POST',
    body: JSON.stringify(loginInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async res => {
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message.slice(1, -1));
    }
    return res.json();
  })
    .then(response => {
      const { id, email, name }: IUser = response.user;
      const userAuth: AuthInfo = {
        accessToken: response.accessToken,
        id,
        expiration: Date.now() + 1000 * 60 * 60,
      };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      User.setUser({ id, email, name });
      loadMainPage();
    })
    .catch(err => {
      switch (err.message) {
        case 'Cannot find user':
          showSnackBar('등록되지 않은 이메일입니다.');
          break;
        case 'Incorrect password':
          showSnackBar('잘못된 비밀번호입니다.');
          break;
        default:
          break;
      }
    });
}

const logout = () => {
  localStorage.removeItem('userAuth');
  User.initialize();
  loadMainPage();
};

function requestUserInfo(userAuth) {
  const { id } = userAuth;
  const accessToken = `Bearer ${userAuth.accessToken}`;

  return fetch(userInfoURL(id), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
  })
    .then(async res => {
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message.slice(1, -1));
      }
      return res.json();
    })
    .then(response => {
      const { email, name }: Partial<IUser> = response;
      User.setUser({ id, email, name });
    })
    .catch(error => console.error('에러', error.message));
}

function updateUserInfo(newUserInfo) {
  const userAuth: AuthInfo = JSON.parse(localStorage.getItem('userAuth'));
  if (!userAuth) return;

  const { id } = userAuth;
  const accessToken = `Bearer ${userAuth.accessToken}`;

  fetch(userInfoURL(id), {
    method: 'PUT',
    body: JSON.stringify(newUserInfo),
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
  })
    .then(async res => {
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message.slice(1, -1));
      }
      return res.json();
    })
    .then(response => {
      const { email, name }: Partial<IUser> = response;
      User.setUser({ id, email, name });
      loadMainPage();
    })
    .catch(error => console.error('에러', error.message));
}

function getSavedAuthInfo(): AuthInfo {
  const emptyAuthInfo: AuthInfo = { accessToken: '', id: -1, expiration: -1 };
  let userAuth: AuthInfo;

  try {
    userAuth = JSON.parse(localStorage.getItem('userAuth'));
  } catch (err) {
    console.error('저장된 Auth 정보를 불러오는데 실패했습니다.');
    return emptyAuthInfo;
  }

  if (userAuth?.expiration < Date.now()) {
    localStorage.removeItem('userAuth');
    return emptyAuthInfo;
  }
  return userAuth;
}

export {
  signUp,
  login,
  logout,
  requestUserInfo,
  updateUserInfo,
  getSavedAuthInfo,
};
