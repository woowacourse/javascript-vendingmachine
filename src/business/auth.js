import { fetcher } from '../lib/fetcher';
import { checkJoinPossible } from '../utils/validation';
import globalStore from '../stores/globalStore';
import { GLOBAL_STATE_KEYS, WEB_STORAGE_KEY } from '../utils/constants';
import { showToast } from '../lib/toast';

export const loginUser = async (emailValue, passwordValue) => {
  try {
    globalStore.setState(GLOBAL_STATE_KEYS.IS_LOADING, true);
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

    globalStore.setState(GLOBAL_STATE_KEYS.IS_LOADING, false);

    globalStore.setState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, {
      loggedUser: user,
      isLoggedIn: true,
    });

    localStorage.setItem(WEB_STORAGE_KEY.ACCESS_TOKEN, JSON.stringify(accessToken));
    localStorage.setItem(WEB_STORAGE_KEY.USER, JSON.stringify(user));

    showToast({ isErrorMessage: false, message: '로그인에 성공하셨습니다.' });

    return true;
  } catch ({ message }) {
    showToast({ isErrorMessage: true, message });
  }
};

export const logoutUser = () => {
  globalStore.setState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, {
    loggedUser: null,
    isLoggedIn: false,
  });

  localStorage.removeItem(WEB_STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(WEB_STORAGE_KEY.USER);
};

export const joinUser = async (email, name, password, passwordReenter) => {
  try {
    if (checkJoinPossible(name, password, passwordReenter)) {
      globalStore.setState(GLOBAL_STATE_KEYS.IS_LOADING, true);

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
      globalStore.setState(GLOBAL_STATE_KEYS.IS_LOADING, false);

      showToast({ isErrorMessage: false, message: '회원가입에 성공하셨습니다.' });

      return true;
    }
  } catch ({ message }) {
    showToast({ isErrorMessage: true, message });
  }
};

export const editUser = async (loggedUser, email, name, password, passwordReenter) => {
  const { id } = loggedUser;
  try {
    if (checkJoinPossible(name, password, passwordReenter)) {
      globalStore.setState(GLOBAL_STATE_KEYS.IS_LOADING, true);

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
      globalStore.setState(GLOBAL_STATE_KEYS.IS_LOADING, false);

      logoutUser();

      showToast({ isErrorMessage: false, message: '유저 정보 수정에 성공하였습니다.' });

      return true;
    }
  } catch ({ message }) {
    showToast({ isErrorMessage: true, message });
  }
};
