export const getSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};
