import { fetcher } from '../lib/fetcher';
import { checkJoinPossible } from '../utils/validation';
import globalStore from '../stores/globalStore';
import { ACTION_TYPES, GLOBAL_STATE_KEYS } from '../utils/constants';

export const loginUser = async (emailValue, passwordValue) => {
  try {
    const data = await fetcher({
      path: '/register',
      option: {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      },
    });

    console.log(data);
  } catch (error) {
    alert(error);
  }
};

export const joinUser = async (email, name, password, passwordReenter) => {
  try {
    if (checkJoinPossible(name, password, passwordReenter)) {
      const { accessToken, user } = await fetcher({
        path: '/register',
        option: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, name }),
        },
      });
      // data로 setting
      // console.log(data);
      globalStore.mutateState({
        actionType: ACTION_TYPES.SET_LOGGED_USER,
        payload: { user },
        stateKey: GLOBAL_STATE_KEYS.LOGGED_USER,
      });

      globalStore.mutateState({
        actionType: ACTION_TYPES.SET_IS_LOGGED_IN,
        payload: { isLoggedIn: true },
        stateKey: GLOBAL_STATE_KEYS.IS_LOGGED_IN,
      });

      localStorage.setItem('logged-user', JSON.stringify(accessToken));
    }
  } catch ({ message }) {
    alert(message);
  }
};
