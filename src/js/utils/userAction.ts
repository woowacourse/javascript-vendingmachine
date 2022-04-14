import { ALERT_MESSAGE } from '../constants';
import { User } from '../interfaces/UserData.interface';

export const getUserData = () => {
  const user: User = JSON.parse(localStorage.getItem('user'));
  return user;
};

export const getUserInitial = () => {
  const name: string = JSON.parse(localStorage.getItem('user')).name;
  return name.slice(0, 1);
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');

  return ALERT_MESSAGE.LOGOUT_SUCCESS;
};
