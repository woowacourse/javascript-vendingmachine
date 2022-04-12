import { getCookiesObject, setCookies } from './cookie';
import { User } from './types/auth';

export const getCurrentUser = (): User => {
  const { accessToken, email, name, id } = getCookiesObject();
  return { accessToken, email, name, id };
};

export const setCurrentUser = ({ accessToken, name, email, id }): void => {
  setCookies({ accessToken, name, email, id });
  document.cookie = `accessToken=${accessToken}`;
  document.cookie = `name=${name}`;
  document.cookie = `email=${email}`;
  document.cookie = `id=${id}`;
};

export const isUserLoggedIn = (): boolean => !!getCurrentUser().accessToken;

export const deleteCurrentUser = (): void => {
  document.cookie =
    'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
