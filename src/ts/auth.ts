import { deleteCookies, getCookiesObject, setCookies } from './cookie';
import { User } from './types/auth';

export const getCurrentUser = (): User => {
  const { accessToken, email, name, id } = getCookiesObject();
  return { accessToken, email, name, id };
};

export const setCurrentUser = ({ accessToken, name, email, id }): void => {
  setCookies({ accessToken, name, email, id });
};

export const isUserLoggedIn = (): boolean => !!getCurrentUser().accessToken;

export const deleteCurrentUser = (): void => {
  deleteCookies('accessToken', 'name', 'email', 'id');
};
