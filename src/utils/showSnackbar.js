import { $ } from './dom';

const showSnackbar = (message) => {
  const $snackbar = $('#snackbar');

  $snackbar.textContent = message;
  $snackbar.classList.toggle('show');
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
};

export default showSnackbar;
