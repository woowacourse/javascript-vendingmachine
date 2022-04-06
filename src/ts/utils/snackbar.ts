import { $ } from './dom';

export const displaySnackbar = (message = '이곳에 메시지를 입력해주세요') => {
  const $snackbar = $('#snackbar');
  $snackbar.textContent = message;
  $snackbar.classList.toggle('show');
  setTimeout(() => {
    $snackbar.classList.toggle('show');
  }, 3000);
};
