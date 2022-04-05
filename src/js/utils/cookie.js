export function setCookie(key, payload) {
  document.cookie = `${key}=${payload}`;
}

export function getCookie(key) {
  const cookieValue = document.cookie
    ?.split('; ')
    ?.find((row) => row.startsWith(key))
    ?.split('=')[1];
  if (cookieValue) return cookieValue;
  return null;
}

export function expireCookie(key) {
  document.cookie = `${key}=; expires=Thu, 18 Dec 2013 12:00:00 GMT`;
}
