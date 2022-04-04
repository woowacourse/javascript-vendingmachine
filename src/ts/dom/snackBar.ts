const SNACK_BAR_DELAY_TIME = 3000;

const generateSnackBarTemplate = (message: string, type: string): string => `
  <div class="snack-bar-container__snack-bar${
    type === 'error' ? '--error' : ''
  }">
    <p class="snack-bar-container__message">${message}</p>
  </div>
`;

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
    setTimeout(() => {
      const $snackBar = document.querySelector(
        '.snack-bar-container__snack-bar--error'
      );
      $snackBar.classList.add('hide');
      container.removeChild($snackBar);
    }, SNACK_BAR_DELAY_TIME);

    return;
  }

  setTimeout(() => {
    const $snackBar = document.querySelector('.snack-bar-container__snack-bar');
    $snackBar.classList.add('hide');
    container.removeChild($snackBar);
  }, SNACK_BAR_DELAY_TIME);
};

export default renderSnackBar;
