export const getCookiesObject = (): any =>
  document.cookie
    .split('; ')
    .map((query) => query.split('='))
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, {});

export const setCookies = (object): void => {
  Object.entries(object).forEach(([key, value]) => {
    document.cookie = `${key}=${value}`;
  });
};

export const deleteCookies = (...keys: string[]): void => {
  keys.forEach((key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};
