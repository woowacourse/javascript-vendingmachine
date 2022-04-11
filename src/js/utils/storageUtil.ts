import { Response } from '../domains/GlobalStore';

export const setData = (key: string, data: object) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getData = (key: string) => JSON.parse(localStorage.getItem(key));

export const getCookie = (name: string): Response | undefined => {
  const matches = document.cookie.match(new RegExp(`${name}=([^;]*)`));

  return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; max-age=-1`;
};
