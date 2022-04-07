export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(`${name}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=3600`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; max-age=1000`;
};
