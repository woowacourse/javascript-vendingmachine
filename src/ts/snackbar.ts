import { $ } from './utils';

const $snackBar = $('#snackbar');

export const alertSnackBar = (message: string) => {
  $snackBar.classList.toggle('show');
  $snackBar.textContent = message;
  setTimeout(() => {
    $snackBar.classList.toggle('show');
  }, 3000);
};
