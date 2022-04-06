export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(`${name}=([^;]*)`));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string, isDeleteCookie = false) => {
  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (isDeleteCookie) {
    updatedCookie += '; max-age=-1';
  }

  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', true);
};
