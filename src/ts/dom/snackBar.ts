import { SNACK_BAR_DELAY_TIME, SNACK_BAR_TYPE } from '../constants/snackBar';

type SnackBarTypes = 'success' | 'error';

const generateSnackBarTemplate = (
  message: string,
  type: SnackBarTypes
): string => `
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
  type: SnackBarTypes
): void => {
  container.insertAdjacentHTML(
    'beforeend',
    generateSnackBarTemplate(message, type)
  );

  const snackBarSelector =
    type === SNACK_BAR_TYPE.ERROR
      ? '.snack-bar-container__snack-bar--error'
      : '.snack-bar-container__snack-bar';

  removeSnackBar(container, snackBarSelector);
};

export default renderSnackBar;
