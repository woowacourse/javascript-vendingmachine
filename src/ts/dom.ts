import { SNACK_BAR_DELAY_TIME, ERROR_MESSAGE } from './constants';

export const on = (
  target: Window | HTMLElement,
  eventName: string,
  callback
) => {
  target.addEventListener(eventName, callback);
};

export const emit = (
  target: Window | HTMLElement,
  eventName: string,
  detail = {}
) => {
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

export const $ = (selector: string): HTMLElement =>
  document.querySelector(selector);
export const $$ = (selector: string): NodeListOf<HTMLElement> =>
  document.querySelectorAll(selector);

export const focusEditInput = ($targetInput: HTMLInputElement): void => {
  $targetInput.focus();
  $targetInput.setSelectionRange(
    $targetInput.value.length,
    $targetInput.value.length
  );
};

export const focusWrongInput = ({
  message,
  $nameInput,
  $priceInput,
  $quantityInput,
}): void => {
  switch (message) {
    case ERROR_MESSAGE.EMPTY_PRODUCT_NAME:
    case ERROR_MESSAGE.DUPLICATED_PRODUCT_NAME:
    case ERROR_MESSAGE.WRONG_LENGTH_PRODUCT_NAME:
      $nameInput.focus();
      break;

    case ERROR_MESSAGE.EMPTY_PRODUCT_PRICE:
    case ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE:
    case ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE:
      $priceInput.focus();
      break;

    case ERROR_MESSAGE.EMPTY_PRODUCT_QUANTITY:
    case ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY:
      $quantityInput.focus();
      break;

    default:
      break;
  }
};
