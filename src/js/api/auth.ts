import { ERROR_MESSAGE } from '../constants/errorConstants';
import { userDataType } from '../types/types';
import { signValidate } from '../validates/signValidate';

const Auth = {
  BASE_URL: 'http://localhost:3000',
  TYPES: {
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    USERS: '/users',
  },

  async signIn({ email, password }: userDataType) {
    const response = await fetch(this.BASE_URL + this.TYPES.SIGN_IN, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.SIGN.FAILED_SIGN_IN);
    }

    const { accessToken, user } = await response.json();
    return { accessToken, user };
  },

  async signUp({ email, name, password, confirmPassword }: userDataType) {
    signValidate.checkSignUpInputs({ email, name, password, confirmPassword });

    const response = await fetch(this.BASE_URL + this.TYPES.SIGN_UP, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.SIGN.FAILED_SIGN_UP);
    }

    const { accessToken, user } = await response.json();
    return { accessToken, user };
  },

  async editUserData({ id, name, password, confirmPassword }: userDataType) {
    signValidate.checkEditedProfileInputs({ name, password, confirmPassword });

    const response = await fetch(this.BASE_URL + this.TYPES.USERS + `/${id}`, {
      method: 'PATCH',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    if (!response.ok) {
      throw new Error(ERROR_MESSAGE.SIGN.FAILED_EDIT_DATA);
    }

    const editedUserData = await response.json();
    return editedUserData;
  },
};

export default Auth;
