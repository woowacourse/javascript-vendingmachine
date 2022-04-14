/* eslint-disable no-void */
import { $ } from './dom';

let timer;

const showSnackbar = (message) => {
  const $snackbar = $('#snackbar');
  $snackbar.textContent = message;

  if (timer) {
    clearTimeout(timer); // 기존 timer 제거

    $snackbar.classList.remove('show');
    void $snackbar.offsetWidth;
  }
  $snackbar.classList.add('show');

  timer = setTimeout(() => {
    $snackbar.classList.remove('show');
    timer = null;
  }, 3000);
};

export default showSnackbar;
