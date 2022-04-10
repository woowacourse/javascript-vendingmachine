import { SNACKBAR_DELAY_TIME } from './constants';

const snackBar = () => {
  const snackBarElement = document.querySelector('.snack-bar');
  let isExistSnackBar = null;

  return mention => {
    if (isExistSnackBar) return;
    snackBarElement.textContent = mention;
    snackBarElement.classList.add('is-active');

    isExistSnackBar = setTimeout(() => {
      snackBarElement.classList.remove('is-active');
      clearTimeout(isExistSnackBar);
      isExistSnackBar = null;
    }, SNACKBAR_DELAY_TIME);
  };
};

export const showSnackBar = snackBar();
