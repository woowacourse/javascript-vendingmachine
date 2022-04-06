import { AUTH, SNACKBAR } from '../constants';
import showSnackbar from './showSnackbar';

export const signup = (email, name, password) => {
  const url = 'http://localhost:3000/signup/';
  const userInfo = {
    email,
    name,
    password,
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      return res.json();
    })
    .then((response) => {
      const userAuth = {
        accessToken: response.accessToken,
        email: response.user.email,
        id: response.user.id,
      };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      window.location.replace('#!product-manage');
      showSnackbar(SNACKBAR.SIGNUP_SUCCESS);
    })
    .catch((error) => {
      if (error.message === '"Email already exists"') {
        alert(AUTH.EMAIL_ALREADY_EXISTS);
      }
    });
};

export const login = (email, password) => {
  const url = 'http://localhost:3000/login/';
  const userInfo = {
    email,
    password,
  };
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      return res.json();
    })
    .then((response) => {
      const userAuth = {
        accessToken: response.accessToken,
        id: response.user.id,
      };
      localStorage.setItem('userAuth', JSON.stringify(userAuth));
      window.location.replace('#!product-manage');
      showSnackbar(SNACKBAR.LOGIN_SUCCESS);
    })
    .catch((error) => {
      if (error.message === '"Cannot find user"') {
        alert(AUTH.CANNOT_FIND_USER);
      }
      if (error.message === '"Incorrect password"') {
        alert(AUTH.INCORRECT_PASSWORD);
      }
      if (error.message === '"Password is too short"') {
        alert(AUTH.PASSWORD_IS_TOO_SHORT);
      }
    });
};
