import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../validation/checkProduct';

import renderSnackBar from '../../dom/snackBar';
import { on, emit, $ } from '../../dom/domHelper';
import focusWrongInput from '../../dom/checkErrorMessage';

export default class ProductInputComponent {
  private $nameInput = $(
    '.product-info-form__product-input'
  ) as HTMLInputElement;
  private $priceInput = $(
    '.product-info-form__price-input'
  ) as HTMLInputElement;
  private $quantityInput = $(
    '.product-info-form__quantity-input'
  ) as HTMLInputElement;
  private $snackBarContainer: HTMLElement = $('.snack-bar-container');
  private $productAddButton: HTMLElement = $('.product-info-form__add-button');

  constructor(private vendingMachineProductManagement) {
    on(this.$productAddButton, 'click', this.onSubmitProductAddButton);
  }

  private onSubmitProductAddButton = (e: Event): void => {
    e.preventDefault();

    try {
      checkValidLengthProductName(this.$nameInput.value.trim());
      checkValidProductPrice(this.$priceInput.valueAsNumber);
      checkValidProductQuantity(this.$quantityInput.valueAsNumber);

      const newProduct = {
        name: this.$nameInput.value.trim(),
        price: this.$priceInput.valueAsNumber,
        quantity: this.$quantityInput.valueAsNumber,
      };

      this.vendingMachineProductManagement.addProduct(newProduct);

      this.$nameInput.value = '';
      this.$priceInput.value = '';
      this.$quantityInput.value = '';
      this.$nameInput.focus();

      emit(this.$productAddButton, '@productInputSubmit', {
        detail: {
          newProduct,
        },
      });
    } catch ({ message }) {
      focusWrongInput({
        message,
        $nameInput: this.$nameInput,
        $priceInput: this.$priceInput,
        $quantityInput: this.$quantityInput,
      });
      renderSnackBar(this.$snackBarContainer, message);
    }
  };
}
