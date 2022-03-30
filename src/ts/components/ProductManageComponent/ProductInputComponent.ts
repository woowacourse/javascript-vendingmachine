import { $, focusWrongInput } from '../../dom';
import renderSnackBar from '../../snakbar';
import { emit, on } from '../../utils';
import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../validator';

export default class ProductInputComponent {
  private $nameInput = $('.products-form__product-input') as HTMLInputElement;
  private $priceInput = $('.products-form__price-input') as HTMLInputElement;
  private $quantityInput = $(
    '.products-form__quantity-input'
  ) as HTMLInputElement;
  private $snackBarContainer: HTMLElement = $('.snack-bar-container');

  constructor(private vendingMachineProductManagement) {
    on($('.products-form__button'), 'click', this.onSubmitProductInputsButton);
  }

  private onSubmitProductInputsButton = (e: Event): void => {
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

      emit($('.products-form__button'), '@productInputSubmit', {
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
