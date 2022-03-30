import { ERROR_MESSAGE } from '../constants/errorMessage';

const focusWrongInput = ({
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

export default focusWrongInput;
