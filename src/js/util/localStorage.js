export const setLocalStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
