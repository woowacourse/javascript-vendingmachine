import { ERROR_MESSAGE, GUIDE_MESSAGE } from '../constants';
import User from '../state/User';
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
      showSnackBar(GUIDE_MESSAGE.SIGNUP_SUCCESS);
    })
    .catch(err => {
      if (err.message === 'Email already exists') {
        showSnackBar(GUIDE_MESSAGE.SIGNUP_EMAIL_ALREADY_EXISTS);
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
      showSnackBar(GUIDE_MESSAGE.LOGIN_SUCCESS);
    })
    .catch(err => {
      switch (err.message) {
        case 'Cannot find user':
          showSnackBar(GUIDE_MESSAGE.LOGIN_CANNOT_FIND_USER);
          break;
        case 'Incorrect password':
          showSnackBar(GUIDE_MESSAGE.LOGIN_INCORRECT_PASSWORD);
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
      showSnackBar(GUIDE_MESSAGE.UPDATE_USER_INFO_SUCCESS);
    })
    .catch(error => console.error('에러', error.message));
}

function getSavedAuthInfo(): AuthInfo {
  const emptyAuthInfo: AuthInfo = { accessToken: '', id: -1, expiration: -1 };
  let userAuth: AuthInfo;

  try {
    userAuth = JSON.parse(localStorage.getItem('userAuth')) || emptyAuthInfo;
  } catch (err) {
    console.error(ERROR_MESSAGE.FAIL_TO_READ_AUTH_INFO);
    return emptyAuthInfo;
  }

  if (userAuth.expiration < Date.now()) {
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
