import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../utils/utils';

import { on, emit, renderSnackBar, $, focusWrongInput } from '../../dom';

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
