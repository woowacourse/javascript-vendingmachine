import { renderToastModal } from './components/ToastNotification';
import { SUCCESS_MESSAGE } from './constants';
import { checkValidProfile } from './domains/validator';

const apiUrl = 'https://json-server-marco.herokuapp.com/';
let userAuth: object = null;

const fetchUtil = () => {};

const setUserAuth = () => {
  localStorage.setItem('userAuth', JSON.stringify(userAuth));
};

const getUserAuth = () => {
  userAuth = JSON.parse(localStorage.getItem('userAuth'));
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

export const loginAuth = () => {
  // const data = await response.json();
  // const userAuth = {
  //   accessToken: data.accessToken,
  //   id: data.user.id,
  // };
};

export const profileEditAuth = () => {};

export const logoutAuth = () => {};
