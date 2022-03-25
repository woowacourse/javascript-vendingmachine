import { SNACK_BAR_DELAY_TIME } from './constants';

export const on = (target, eventName, callback) => {
  target.addEventListener(eventName, callback);
};

export const emit = (target, eventName, detail = {}) => {
  const customEvent = new CustomEvent(eventName, detail);
  target.dispatchEvent(customEvent);
};

const generateSnackBarTemplate = (message: string): string => `
  <div class="snack-bar-container__snack-bar--error">
    <p class="snack-bar-container__message">${message}</p>
  </div>
`;

export const renderSnackBar = (
  container: HTMLElement,
  message: string
): void => {
  container.insertAdjacentHTML('beforeend', generateSnackBarTemplate(message));

  setTimeout(() => {
    const $snackBar = document.querySelector(
      '.snack-bar-container__snack-bar--error'
    );
    $snackBar.classList.add('hide');
    container.removeChild($snackBar);
  }, SNACK_BAR_DELAY_TIME);
};

export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const focusEditInput = ($targetInput: HTMLInputElement): void => {
  $targetInput.focus();
  $targetInput.setSelectionRange(
    $targetInput.value.length,
    $targetInput.value.length
  );
};
