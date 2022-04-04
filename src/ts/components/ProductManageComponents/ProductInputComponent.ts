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
      const productName = this.$nameInput.value.trim();
      const productPrice = this.$priceInput.valueAsNumber;
      const productQuantity = this.$quantityInput.valueAsNumber;

      checkValidLengthProductName(productName);
      checkValidProductPrice(productPrice);
      checkValidProductQuantity(productQuantity);

      const newProduct = {
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
        `품명: ${productName}<br>가격: ${productPrice}<br>수량: ${productQuantity}<br>상품이 등록되셨습니다. 등록된 상품을 확인해주세요.`,
        'success'
      );

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
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
