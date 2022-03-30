import { ERROR_MESSAGE } from './constants';

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

    case ERROR_MESSAGE.WRONG_UNIT_PRODUCT_PRICE:
    case ERROR_MESSAGE.WRONG_RANGE_PRODUCT_PRICE:
      $priceInput.focus();
      break;

    case ERROR_MESSAGE.WRONG_PRODUCT_QUANTITY:
      $quantityInput.focus();
      break;

    default:
      break;
  }
};
