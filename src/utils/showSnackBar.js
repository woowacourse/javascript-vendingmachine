import { SNACKBAR_DELAY_TIME } from './constants';

export const showSnackBar = mention => {
  const snackBar = document.querySelector('.snack-bar');
  snackBar.textContent = mention;
  snackBar.classList.add('is-active');
  setTimeout(() => snackBar.classList.remove('is-active'), SNACKBAR_DELAY_TIME);
};
