export const setCookie = (key, value, period) => {
  const expiredDate = new Date();
  expiredDate.setDate(expiredDate.getDate() + period);

  const newCookie = `${key}=${value};expires=${expiredDate.toUTCString()}`;

  document.cookie = newCookie;
};

export const getCookie = (key) =>
  document.cookie &&
  document.cookie
    .split('; ')
    .find((pair) => pair.startsWith(key))
    .split('=')[1];

export const deleteCookie = (key) => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 1);

  const deletedCookie = `${key}=;expires=${pastDate.toUTCString()}`;
  document.cookie = deletedCookie;
};
