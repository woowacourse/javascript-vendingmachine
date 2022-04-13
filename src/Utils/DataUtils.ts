export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const isNumberInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isStringLengthInRange = (value: string, min: number, max: number): boolean =>
  value.length >= min && value.length <= max;

export const isCorrectNumberUnit = (value: number, unit: number): boolean => value % unit === 0;

export const getTimeStamp = (): number => Math.floor(Date.now() / 1000);

export const getTimeDiffToPercent = (startTime, currentTime, totalTime = 1000) =>
  Math.ceil((currentTime - startTime) * (100 / totalTime));

export const setCookie = (key: string, value: string, expire = 3600) => {
  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + expire);

  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expireDate.toUTCString()};`;
};

export const removeCookies = (targetKey: string | [string]): void => {
  const keyList: [string] = typeof targetKey === 'string' ? [targetKey] : targetKey;
  keyList.forEach(key => {
    setCookie(key, '', -1);
  });
};

export const removeCookie = (key: string, value: string, expire = 3600) => {
  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + expire);

  document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expireDate.toUTCString()};`;
};

export const getCookie = targetKey => {
  const splitCookie = document.cookie.split('; ');
  const cookieList = splitCookie.reduce((previous, cookie) => {
    const [key, value] = cookie.split('=');

    previous[key] = decodeURIComponent(value);
    return previous;
  }, {});

  return cookieList[targetKey];
};

export const getEntryPath = (patnName = ''): string => {
  const pathName = patnName || window.location.pathname;
  const paths = pathName.split('/').filter(entry => entry !== '');

  return paths[paths.length - 1];
};
