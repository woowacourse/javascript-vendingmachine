export const setData = (key: string, data: object) =>
  localStorage.setItem(key, JSON.stringify(data));

export const getData = (key: string) => JSON.parse(localStorage.getItem(key));

export const setSessionData = (key: string, data: object) =>
  sessionStorage.setItem(key, JSON.stringify(data));

export const getSessionData = (key: string) =>
  JSON.parse(sessionStorage.getItem(key));
