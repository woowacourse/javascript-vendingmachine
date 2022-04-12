import { $ } from './dom';

const $snackbar = $('#snackbar');
let timer = null;

export const handleSnackbarMessage = (message) => {
  if (timer) {
    clearTimeout(timer);
  }
  $snackbar.classList.add('show');
  $snackbar.textContent = message;
  timer = setTimeout(() => {
    $snackbar.classList.remove('show');
  }, 1800);
};
