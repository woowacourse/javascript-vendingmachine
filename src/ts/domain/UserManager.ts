import { SERVER_ENTRY, API_QUERY } from '../constants';
import UserType from '../type/UserType';
import { alertSnackBar } from '../utils';
import { checkRegister } from './validator';

export interface UserManagerInterface {
  registerUser(userInfo: UserType): void;
}

class UserManager implements UserManagerInterface {
  registerUser = async ({ email, name, password, passwordCheck }) => {
    try {
      checkRegister(name, password, passwordCheck);
    } catch (error) {
      alertSnackBar(error.message);
      return;
    }

    const response = await fetch(`${SERVER_ENTRY}${API_QUERY.REGISTER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({ email, name, password }),
    });
    const result = await response.json();
    if (!response.ok) {
      alertSnackBar(result);
    }
  };
}

export default UserManager;
