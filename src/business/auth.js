import { fetcher } from '../lib/fetcher';
import { checkJoinPossible } from '../utils/validation';
import globalStore from '../stores/globalStore';
import { ACTION_TYPES, GLOBAL_STATE_KEYS } from '../utils/constants';

export const loginUser = async (emailValue, passwordValue) => {
  try {
    const { accessToken, user } = await fetcher({
      path: '/login',
      option: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      },
    });

    globalStore.setState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, {
      loggedUser: user,
      isLoggedIn: true,
    });

    localStorage.setItem('access-token', JSON.stringify(accessToken));

    return true;
  } catch ({ message }) {
    alert(message);
  }
};

export const joinUser = async (email, name, password, passwordReenter) => {
  try {
    if (checkJoinPossible(name, password, passwordReenter)) {
      await fetcher({
        path: '/register',
        option: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        },
      });

      return true;
    }
  } catch ({ message }) {
    alert(message);
  }
};

export const editUser = async (loggedUser, email, name, password, passwordReenter) => {
  const { id } = loggedUser;
  try {
    if (checkJoinPossible(name, password, passwordReenter)) {
      await fetcher({
        path: `/users/${id}`,
        option: {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        },
      });

      globalStore.setState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, {
        loggedUser: null,
        isLoggedIn: false,
      });

      localStorage.removeItem('access-token');

      return true;
    }
  } catch ({ message }) {
    alert(message);
  }
};

export const logoutUser = () => {
  globalStore.setState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, {
    loggedUser: null,
    isLoggedIn: false,
  });

  localStorage.removeItem('access-token');
};
