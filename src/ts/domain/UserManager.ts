import { resolveConfig } from 'prettier';
import { SERVER_ENTRY, API_QUERY, STORAGE_ID } from '../constants';
import UserType from '../type/UserType';
import { $, alertSnackBar } from '../utils';
import { checkRegister } from './validator';

export interface UserManagerInterface {
  registerUser(userInfo: UserType): Promise<boolean>;
  login(loginInfo: { email: string; password: string }): Promise<boolean>;
  logout(): void;
}

class UserManager implements UserManagerInterface {
  registerUser = async ({ email, name, password }) => {
    try {
      const response = await fetch(`${SERVER_ENTRY}${API_QUERY.REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ email, name, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result);
      }
    } catch (error) {
      alertSnackBar(error.message);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  };

  login = async ({ email, password }) => {
    try {
      const response = await fetch(`${SERVER_ENTRY}${API_QUERY.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result);
      }

      localStorage.setItem(STORAGE_ID.LOGIN, result.accessToken);
    } catch (error) {
      alertSnackBar(error.message);
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  };

  logout = () => {
    localStorage.removeItem(STORAGE_ID.LOGIN);
    $('.profile-menu').classList.add('hide');
    location.href = 'http://localhost:9000/#!/purchase-product';
  };
}

export default UserManager;
