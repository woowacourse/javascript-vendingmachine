import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../utils/utils';

import { emit, renderSnackBar } from '../../dom';

export default class ProductInputComponent {
  private $nameInput: HTMLInputElement = document.querySelector(
    '.product-info-form__product-input'
  );
  private $priceInput: HTMLInputElement = document.querySelector(
    '.product-info-form__price-input'
  );
  private $quantityInput: HTMLInputElement = document.querySelector(
    '.product-info-form__quantity-input'
  );
  private $snackBarContainer: HTMLElement = document.querySelector(
    '.snack-bar-container'
  );

  vendingMachineProductManagement;

  constructor(vendingMachineProductManagement) {
    this.vendingMachineProductManagement = vendingMachineProductManagement;
    document
      .querySelector('.product-info-form__button')
      .addEventListener('click', this.onSubmitProductInputsButton);
  }

  onSubmitProductInputsButton = (e: Event) => {
    e.preventDefault();

    try {
      checkValidLengthProductName(this.$nameInput.value);
      checkValidProductPrice(this.$priceInput.valueAsNumber);
      checkValidProductQuantity(this.$quantityInput.valueAsNumber);

      this.vendingMachineProductManagement.addProduct({
        name: this.$nameInput.value,
        price: this.$priceInput.valueAsNumber,
        quantity: this.$quantityInput.valueAsNumber,
      });

      emit(
        document.querySelector('.product-info-form__button'),
        '@productInputSubmit',
        {
          detail: {
            name: this.$nameInput.value,
            price: this.$priceInput.valueAsNumber,
            quantity: this.$quantityInput.valueAsNumber,
          },
        }
      );

      this.$nameInput.value = '';
      this.$priceInput.value = '';
      this.$quantityInput.value = '';
      this.$nameInput.focus();
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message);
    }
  };
}
