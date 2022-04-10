import { $ } from './dom';

const getRandomIndex = <T>(array: T[]) => {
  return Math.floor(Math.random() * array.length);
};

const showSnackbar = (message: string) => {
  const $snackbar = $('#snackbar');
  $snackbar.textContent = message;
  $snackbar.classList.toggle('show');

  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 2000);
};

export { getRandomIndex, showSnackbar };
