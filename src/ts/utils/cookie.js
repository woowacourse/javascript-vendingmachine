export const setCookie = (key, value, period) => {
  const expiredDate = new Date();
  expiredDate.setDate(expiredDate.getDate() + period);

  const newCookie = `${key}=${value};expires=${expiredDate.toUTCString()}`;

  document.cookie = newCookie;
};

export const getCookie = (key) => {
  return (
    document.cookie ??
    document.cookie
      .split('; ')
      .find((pair) => pair.startsWith(key))
      .split('=')[1]
  );
};
