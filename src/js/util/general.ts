export const generateUniqueId = (): string => {
  const date = Date.now().toString(36);
  const randomNumber = Math.random().toString(36);
  return date + randomNumber;
};

export const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}`;
};

export const clearCookie = (key: string) => {
  document.cookie = `${key}=;`;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const routerPush = (path: string) => {
  location.href = path;
};
