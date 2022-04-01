import { $ } from './dom';

const $snackbar = $('#snackbar');

export const handleSnackbarMessage = (message) => {
  $snackbar.classList.toggle('show');
  $snackbar.textContent = message;
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 1800);
};
