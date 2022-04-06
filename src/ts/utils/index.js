import { SNACKBAR_MS_TIME } from '../constant/rule';
import { SELECTOR_NAME } from '../constant/selector';

export const selectDom = (selector, parent = document) => parent.querySelector(selector);

export const selectDoms = (selector, parent = document) => parent.querySelectorAll(selector);

export const showSnackbar = (snackbarElement, messsage) => {
  snackbarElement.classList.add(SELECTOR_NAME.SHOW);
  snackbarElement.textContent = messsage;

  const snackbarStartTime = new Date().getTime();
  const snackbarAnimation = () => {
    const snackbarCurrentTime = new Date().getTime();
    if (snackbarCurrentTime < snackbarStartTime + SNACKBAR_MS_TIME) {
      requestAnimationFrame(snackbarAnimation);
      return;
    }
    snackbarElement.classList.remove(SELECTOR_NAME.SHOW);
  };
  requestAnimationFrame(snackbarAnimation);
};
