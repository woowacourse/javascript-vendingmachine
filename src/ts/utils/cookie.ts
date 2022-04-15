import { generateCookieRegex } from '../constant/regex';

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(generateCookieRegex(name));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; max-age=1000`;
};
