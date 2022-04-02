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

    globalStore.mutateState({
      actionType: ACTION_TYPES.LOGIN_USER,
      payload: { loggedUser: user },
      stateKey: GLOBAL_STATE_KEYS.AUTH_INFORMATION,
    });

    localStorage.setItem('logged-user', JSON.stringify(user));
    localStorage.setItem('access-token', JSON.stringify(accessToken));

    return true;
  } catch (error) {
    alert(error);
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
