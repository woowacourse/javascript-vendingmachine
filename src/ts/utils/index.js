export const selectDom = (selector, parent = document) => parent.querySelector(selector);

export const selectDoms = (selector, parent = document) => parent.querySelectorAll(selector);

export const showSnackbar = (snackbarElement, messsage) => {
  snackbarElement.classList.add('show');
  snackbarElement.textContent = messsage;
  setTimeout(() => {
    snackbarElement.classList.remove('show');
  }, 2700);
};
