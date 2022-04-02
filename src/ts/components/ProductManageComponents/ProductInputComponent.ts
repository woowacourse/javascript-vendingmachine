import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../validation/checkProduct';

import renderSnackBar from '../../dom/snackBar';
import { on, emit, $ } from '../../dom/domHelper';
import focusWrongInput from '../../dom/checkErrorMessage';

export default class ProductInputComponent {
  private $nameInput = $<HTMLInputElement>('.product-info-form__product-input');
  private $priceInput = $<HTMLInputElement>('.product-info-form__price-input');
  private $quantityInput = $<HTMLInputElement>(
    '.product-info-form__quantity-input'
  );
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');
  private $productAddButton = $<HTMLButtonElement>(
    '.product-info-form__add-button'
  );

  constructor(private vendingMachineProductManagement) {
    on(this.$productAddButton, 'click', this.onSubmitProductAddButton);
  }

  private onSubmitProductAddButton = (event: Event): void => {
    event.preventDefault();

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

      emit(this.$productAddButton, '@consumerProductState', {
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
