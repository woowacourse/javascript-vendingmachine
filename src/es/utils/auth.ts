import User from '../data/User';
import { IUser } from '../interface';
import { loadMainPage } from '../routes';

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

const signUpURL = 'http://localhost:3000/signup/';
const loginURL = 'http://localhost:3000/login/';
const userInfoURL = (id) => `http://localhost:3000/600/users/${id}`;

function signUp(signUpInfo: SignInfo) {
  fetch(signUpURL, {
    method: 'POST',
    body: JSON.stringify(signUpInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error('회원가입 오류');
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
    .catch(error => console.error('에러', error.message));
}

function login(loginInfo: SignInfo) {
  fetch(loginURL, {
    method: 'POST',
    body: JSON.stringify(loginInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    if (!res.ok) {
      throw new Error('로그인 정보 오류');
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
    .catch(error => console.error('에러', error.message));
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
    .then(res => {
      if (!res.ok) {
        throw new Error('사용자 정보 읽기 오류');
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
    .then(res => {
      if (!res.ok) {
        throw new Error('사용자 정보 업데이트 오류');
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

function getSavedUserInfo(): AuthInfo | null {
  const userAuth: AuthInfo | null = JSON.parse(localStorage.getItem('userAuth'));
  if (userAuth?.expiration < Date.now()) {
    localStorage.removeItem('userAuth');
  }
  return userAuth;
}

export {
  signUp,
  login,
  logout,
  requestUserInfo,
  updateUserInfo,
  getSavedUserInfo,
};
