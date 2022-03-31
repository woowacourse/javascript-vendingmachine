import { Product } from '../../types/vendingMachineProductManager';

import renderSnackBar from '../../dom/snackBar';
import { on, $, focusEditInput } from '../../dom/domHelper';
import focusWrongInput from '../../dom/checkErrorMessage';

import { DELETE_PRODUCT_CONFIRM_MESSAGE } from '../../constants/errorMessage';

import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../validation/checkProduct';
import {
  generateTemplate,
  generateEditTemplate,
} from './productStateTemplates';

export default class ProductStateComponent {
  private productTableTbody: HTMLElement = $('.product-table tbody');
  private $snackBarContainer: HTMLElement = $('.snack-bar-container');

  constructor(private vendingMachineProductManager) {
    on(
      $('.product-info-form__add-button'),
      '@productInputSubmit',
      this.addProduct
    );
    on(this.productTableTbody, 'click', this.onClickProductList);
    on(this.productTableTbody, 'keyup', this.onKeyupProductList);
  }

  private addProduct = ({ detail: { newProduct } }): void => {
    this.productTableTbody.insertAdjacentHTML(
      'beforeend',
      generateTemplate(newProduct)
    );
  };

  private approveEditProduct(target) {
    const parentElement: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const $editProductNameInput = $(
      '.product-table__product-name-input--edit'
    ) as HTMLInputElement;
    const $editProductPriceInput = $(
      '.product-table__product-price-input--edit'
    ) as HTMLInputElement;
    const $editProductQuantityInput = $(
      '.product-table__product-quantity-input--edit'
    ) as HTMLInputElement;

    try {
      checkValidLengthProductName($editProductNameInput.value);
      checkValidProductPrice($editProductPriceInput.valueAsNumber);
      checkValidProductQuantity($editProductQuantityInput.valueAsNumber);

      const editedProduct: Product = {
        name: $editProductNameInput.value,
        price: $editProductPriceInput.valueAsNumber,
        quantity: $editProductQuantityInput.valueAsNumber,
      };

      this.vendingMachineProductManager.editProduct(
        parentElement.dataset.productName,
        editedProduct
      );

      parentElement.innerHTML = generateTemplate(editedProduct);
      parentElement.dataset.productName = $editProductNameInput.value;
    } catch ({ message }) {
      focusWrongInput({
        message,
        $nameInput: $editProductNameInput,
        $priceInput: $editProductPriceInput,
        $quantityInput: $editProductQuantityInput,
      });
      renderSnackBar(this.$snackBarContainer, message);
    }
  }

  private readyEditProduct(target) {
    const parentElement: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const targetProduct: Product =
      this.vendingMachineProductManager.getTargetProduct(
        parentElement.dataset.productName
      );

    parentElement.innerHTML = generateEditTemplate(targetProduct);

    focusEditInput(
      parentElement.querySelector('.product-table__product-name-input--edit')
    );
  }

  private deleteProduct(target): void {
    const parentElement: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const grandParentElement: HTMLElement = target.closest('tbody');
    const targetProductName = parentElement.dataset.productName;

    if (!window.confirm(DELETE_PRODUCT_CONFIRM_MESSAGE(targetProductName))) {
      return;
    }

    this.vendingMachineProductManager.deleteProduct(targetProductName);

    grandParentElement.removeChild(parentElement);
  }

  private onKeyupProductList = ({ target, key }) => {
    if (!target.matches('.product-table__input--edit')) return;
    if (key !== 'Enter') return;

    this.approveEditProduct(target);
  };

  private onClickProductList = ({ target }): void => {
    if (
      !target.matches('.product-table__confirm-button') &&
      !target.matches('.product-table__edit-button') &&
      !target.matches('.product-table__delete-button')
    ) {
      return;
    }

    if (target.matches('.product-table__confirm-button')) {
      this.approveEditProduct(target);

      return;
    }

    if (target.matches('.product-table__edit-button')) {
      this.readyEditProduct(target);

      return;
    }

    if (target.matches('.product-table__delete-button')) {
      this.deleteProduct(target);

      return;
    }
  };
}
