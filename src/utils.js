export const $ = (selector, scope = document) => scope.querySelector(selector);

export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export const showElement = (element) => {
  element.classList.remove('hidden');
};

export const hideElement = (element) => {
  element.classList.add('hidden');
};

export const floatSnackbar = ($snackbar) => {
  $snackbar.classList.toggle('show');

  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
};

export const pickNumberInList = (array) => {
  const index = Math.floor(Math.random() * array.length);

  return array[index];
};

export const addThousandUnitComma = (number) => {
  return number.toLocaleString();
};

export const getCookie = (key) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${key.replace('/([.$?*|{}()[]\\/+^])/g', '\\$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};
