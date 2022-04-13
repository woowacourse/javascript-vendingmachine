import { SNACK_BAR_DELAY_TIME } from '../constants/snackBar';

const generateSnackBarTemplate = (message: string, type: string): string => `
  <div class="snack-bar-container__snack-bar${
    type === 'error' ? '--error' : ''
  }">
    <p class="snack-bar-container__message">${message}</p>
  </div>
`;

const removeSnackBar = (container: HTMLElement, selector: string): void => {
  setTimeout(() => {
    const $snackBar = document.querySelector(selector);
    $snackBar.classList.add('hide');
    container.removeChild($snackBar);
  }, SNACK_BAR_DELAY_TIME);
};

const renderSnackBar = (
  container: HTMLElement,
  message: string,
  type: string
): void => {
  container.insertAdjacentHTML(
    'beforeend',
    generateSnackBarTemplate(message, type)
  );

  if (type === 'error') {
    removeSnackBar(container, '.snack-bar-container__snack-bar--error');

    return;
  }

  removeSnackBar(container, '.snack-bar-container__snack-bar');
};

export default renderSnackBar;
