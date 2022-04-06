export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(new RegExp(`${name}=([^;]*)`));

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
};
