import { TAuthAction, IAuthStore } from './types';
import { accessTokenStorage, userIdStorage, userInfoStorage } from './localStorage';
import { AuthActionTypes, ERROR_MSG } from '../utils/constants';

class AuthStore implements IAuthStore {
  async mutateState({ actionType, payload }: { actionType: TAuthAction; payload: unknown }) {
    try {
      await this.reducer[actionType](payload);
      window.location.href = '#';
    } catch ({ message }) {
      alert(message);
    }
  }

  reducer = {
    [AuthActionTypes.SIGN_IN]: async payload => {
      const { email, name, password } = payload;

      const userData = JSON.stringify({ email, name, password });

      const response = await fetch(
        'https://vendingmachineserver-api.herokuapp.com/users/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: userData,
        },
      );

      if (response.status === 400) {
        throw new Error(ERROR_MSG.FAILED_SIGN_IN);
      }

      const {
        accessToken,
        user: { id },
      } = await response.json();

      accessTokenStorage.setAccessToken(accessToken);
      userIdStorage.setUserId(id);

      await this.setLoginUserInfo();
    },
    [AuthActionTypes.LOGIN]: async payload => {
      const { email, password } = payload;

      const loginData = JSON.stringify({ email, password });

      const response = await fetch('https://vendingmachineserver-api.herokuapp.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: loginData,
      });
      if (response.status === 400) {
        throw new Error(ERROR_MSG.FAILED_LOGIN);
      }

      const {
        accessToken,
        user: { id },
      } = await response.json();

      accessTokenStorage.setAccessToken(accessToken);
      userIdStorage.setUserId(id);

      await this.setLoginUserInfo();
    },
    [AuthActionTypes.LOGOUT]: payload => {
      localStorage.clear();
      window.location.href = '#login';
    },
    [AuthActionTypes.EDIT_USER_INFO]: async payload => {
      const userId = userIdStorage.getUserId();
      const { name, password } = payload;

      const editedData = JSON.stringify({ name, password });

      const editResponse = await fetch(
        `https://vendingmachineserver-api.herokuapp.com/users/${userId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: editedData,
        },
      );

      if (editResponse.status === 400) {
        throw new Error(ERROR_MSG.FAILED_EDIT_USER_INFO);
      }

      await this.setLoginUserInfo();
    },
  };

  async setLoginUserInfo() {
    const userId = userIdStorage.getUserId();
    if (userId.length === 0) {
      return false;
    }
    try {
      const response = await fetch(
        `https://vendingmachineserver-api.herokuapp.com/users/${userId}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.status === 400) {
        throw new Error(ERROR_MSG.FAILED_GET_USER_INFO);
      }
      const { email, name } = await response.json();

      const userInfo = { userEmail: email, userName: name };
      userInfoStorage.setUserInfo(userInfo);
    } catch ({ message }) {
      alert(message);
    }
  }
}

export default new AuthStore();
