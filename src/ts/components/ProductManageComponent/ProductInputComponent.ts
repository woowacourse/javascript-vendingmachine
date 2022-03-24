import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../utils/utils';

import { on, emit, renderSnackBar, $ } from '../../dom';

export default class ProductInputComponent {
  private $nameInput: HTMLInputElement = $('.product-info-form__product-input');
  private $priceInput: HTMLInputElement = $('.product-info-form__price-input');
  private $quantityInput: HTMLInputElement = $(
    '.product-info-form__quantity-input'
  );
  private $snackBarContainer: HTMLElement = $('.snack-bar-container');

  constructor(private vendingMachineProductManagement) {
    on(
      $('.product-info-form__button'),
      'click',
      this.onSubmitProductInputsButton
    );
  }

  private onSubmitProductInputsButton = (e: Event): void => {
    e.preventDefault();

    try {
      checkValidLengthProductName(this.$nameInput.value);
      checkValidProductPrice(this.$priceInput.valueAsNumber);
      checkValidProductQuantity(this.$quantityInput.valueAsNumber);

      const newProduct = {
        name: this.$nameInput.value,
        price: this.$priceInput.valueAsNumber,
        quantity: this.$quantityInput.valueAsNumber,
      };

      this.vendingMachineProductManagement.addProduct(newProduct);

      emit($('.product-info-form__button'), '@productInputSubmit', {
        detail: {
          newProduct,
        },
      });

      this.$nameInput.value = '';
      this.$priceInput.value = '';
      this.$quantityInput.value = '';
      this.$nameInput.focus();
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message);
    }
  };
}
