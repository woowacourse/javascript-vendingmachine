import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../utils/utils';

import { emit } from '../dom';

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

  vendingMachineProductManagement;

  constructor(vendingMachineProductManagement) {
    this.vendingMachineProductManagement = vendingMachineProductManagement;
    document
      .querySelector('.product-info-form__button')
      .addEventListener('click', this.onSubmitProductInputs);
  }

  onSubmitProductInputs = (e: Event) => {
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
    } catch (error) {
      console.error(error);
    }
  };
}
