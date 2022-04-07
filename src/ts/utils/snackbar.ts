import { selectDom } from '.';
import { ID, CLASS } from '../constant/selector';

const showSnackbar = (function () {
  let timerId;
  const snackbar: HTMLElement | null = selectDom(`#${ID.SNACKBAR}`);

  return (message: string) => {
    snackbar.textContent = message;

    if (timerId) return;
    snackbar.classList.toggle(CLASS.SHOW);
    timerId = setTimeout(() => {
      snackbar.classList.toggle(CLASS.SHOW);
      timerId = null;
    }, 3000);
  };
})();

export default showSnackbar;
