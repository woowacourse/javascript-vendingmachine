import { Product } from '../../types/vendingMachineProductManager';

import SUCCESS_MESSAGE from '../../constants/successMessage';

import renderSnackBar from '../../dom/snackBar';
import { on, emit, $ } from '../../dom/domHelper';
import focusWrongInput from '../../dom/checkErrorMessage';

import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../validation/checkProduct';

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

  private onSubmitProductAddButton = (event: SubmitEvent): void => {
    event.preventDefault();

    const productName = this.$nameInput.value.trim();
    const { valueAsNumber: productPrice } = this.$priceInput;
    const { valueAsNumber: productQuantity } = this.$quantityInput;

    try {
      checkValidLengthProductName(productName);
      checkValidProductPrice(productPrice);
      checkValidProductQuantity(productQuantity);

      const newProduct: Product = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
      };

      this.vendingMachineProductManagement.addProduct(newProduct);

      this.$nameInput.value = '';
      this.$priceInput.value = '';
      this.$quantityInput.value = '';
      this.$nameInput.focus();

      renderSnackBar(
        this.$snackBarContainer,
        SUCCESS_MESSAGE.ADDED_PRODUCT,
        'success'
      );

      emit(this.$productAddButton, '@addNewProduct', {
        detail: {
          newProduct,
        },
      });
      emit(this.$productAddButton, '@addConsumerProduct', {
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

      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
