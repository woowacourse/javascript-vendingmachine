import { renderToastModal } from './components/ToastNotification';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from './constants';
import { checkValidProfile } from './domains/validator';

const apiUrl = 'https://json-server-marco.herokuapp.com';

let accessToken = null;
let userUrl = null;

const fetchUtil = () => {};

const setUserAuth = (userAuth: object) => {
  localStorage.setItem('userAuth', JSON.stringify(userAuth));
};

export const getUserData = async () => {
  const userAuth = JSON.parse(localStorage.getItem('userAuth'));
  accessToken = `Bearer ${userAuth.accessToken}`;
  userUrl = `${apiUrl}/users/${userAuth.id}`;

  const response = await fetch(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
  });
  if (!response.ok) {
    throw new Error(`API에러: ${await response.text()}`);
  }
  const data = await response.json();

  return { email: data.email, name: data.name };
};

export const signupAuth = async ({ email, name, password, passwordCheck }) => {
  try {
    if (checkValidProfile(name, password, passwordCheck)) {
      const response = await fetch(`${apiUrl}/signup`, {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`API에러: ${await response.text()}`);
      }
      renderToastModal('success', SUCCESS_MESSAGE.SIGNUP_COMPLETE);

      return true;
    }
  } catch (error) {
    renderToastModal('error', error.message);
  }
};

export const loginAuth = async ({ email, password }) => {
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`API에러: ${await response.text()}`);
    }
    const data = await response.json();
    const userAuth = {
      accessToken: data.accessToken,
      id: data.user.id,
    };
    setUserAuth(userAuth);
    renderToastModal('success', SUCCESS_MESSAGE.LOGIN_COMPLETE);

    return true;
  } catch (error) {
    renderToastModal('error', ERROR_MESSAGE.LOGIN_FAILED);
  }
};

export const profileEditAuth = async ({ name, password, passwordCheck }) => {
  try {
    if (checkValidProfile(name, password, passwordCheck)) {
      const response = await fetch(userUrl, {
        method: 'PATCH',
        body: JSON.stringify({ name, password }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
      });
      if (!response.ok) {
        throw new Error(`API에러: ${await response.text()}`);
      }
      renderToastModal('success', SUCCESS_MESSAGE.SIGNUP_COMPLETE);

      return true;
    }
  } catch (error) {
    renderToastModal('error', error.message);
  }
};

export const logoutAuth = () => {};
