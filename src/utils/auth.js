import { AUTH, SNACKBAR } from '../constants';
import { renderManagerView, renderUserView } from '../router';
import showSnackbar from './showSnackbar';

const setLoginedUser = (userInfo) => {
  localStorage.setItem('userAuth', JSON.stringify(userInfo));
};

export const signup = (email, name, password) => {
  const url = 'https://woowa-vendingmachine-app.herokuapp.com/signup/';
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
        id: response.user.id,
      };
      setLoginedUser(userAuth);
      renderManagerView();
      showSnackbar(SNACKBAR.SIGNUP_SUCCESS);
    })
    .catch((error) => {
      if (error.message === '"Email already exists"') {
        alert(AUTH.EMAIL_ALREADY_EXISTS);
      }
    });
};

export const login = (email, password) => {
  const url = 'https://woowa-vendingmachine-app.herokuapp.com/login/';
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
      setLoginedUser(userAuth);
      renderManagerView();
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

export const logout = () => {
  localStorage.removeItem('userAuth');

  renderUserView();
};

export const modifyUserInfo = (email, name, password) => {
  const userInfo = JSON.parse(localStorage.getItem('userAuth'));
  const { id } = userInfo;
  const accessToken = `Bearer ${userInfo.accessToken}`;
  const url = `https://woowa-vendingmachine-app.herokuapp.com/600/users/${id}`;
  const newUserInfo = {
    email,
    name,
    password,
  };

  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(newUserInfo),
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },
  })
    .then((res) => {
      if (!res.ok) {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
      renderManagerView();
      showSnackbar(SNACKBAR.MODIFY_SUCCESS);
      return res.json();
    })
    .catch((error) => {
      alert(error);
    });
};
