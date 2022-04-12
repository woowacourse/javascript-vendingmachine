import { Product } from '../../types/vendingMachineProductManager';

import renderSnackBar from '../../dom/snackBar';
import { on, $, focusEditInput, $$, emit } from '../../dom/domHelper';
import focusWrongInput from '../../dom/checkErrorMessage';

import { DELETE_PRODUCT_CONFIRM_MESSAGE } from '../../constants/errorMessage';
import SUCCESS_MESSAGE from '../../constants/successMessage';

import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../validation/checkProduct';
import {
  generateTemplate,
  generateEditTemplate,
} from './productStateTemplates';

export default class ProductsStateComponent {
  private $productTableTbody = $<HTMLElement>('.product-table tbody');
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');

  constructor(private vendingMachineProductManager) {
    on(this.$productTableTbody, 'click', this.onClickProductList);
    on(this.$productTableTbody, 'keyup', this.onKeyupProductList);

    on(
      $<HTMLButtonElement>('.product-info-form__add-button'),
      '@addNewProduct',
      this.addNewProduct
    );
    on(
      $<HTMLElement>('.consumer-product-table__tbody'),
      '@subtractProductQuantity',
      this.subtractProductQuantity
    );
  }

  private subtractProductQuantity = ({ detail: { editProduct } }): void => {
    this.vendingMachineProductManager.editQuantity(editProduct);

    const $subtractProductTarget = Array.from(
      $$('.product-table__info-tr')
    ).find((product) => product.dataset.productName === editProduct.name);

    $<HTMLElement>(
      '.product-table__product-quantity',
      $subtractProductTarget
    ).textContent = editProduct.quantity;
  };

  private addNewProduct = ({ detail: { newProduct } }): void => {
    this.$productTableTbody.insertAdjacentHTML(
      'beforeend',
      generateTemplate(newProduct)
    );
  };

  private approveEditProduct(target: HTMLButtonElement): void {
    const $editProductTarget: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const $editProductNameInput = $<HTMLInputElement>(
      '.product-table__product-name-input--edit',
      $editProductTarget
    );
    const $editProductPriceInput = $<HTMLInputElement>(
      '.product-table__product-price-input--edit',
      $editProductTarget
    );
    const $editProductQuantityInput = $<HTMLInputElement>(
      '.product-table__product-quantity-input--edit',
      $editProductTarget
    );

    try {
      checkValidLengthProductName($editProductNameInput.value);
      checkValidProductPrice($editProductPriceInput.valueAsNumber);
      checkValidProductQuantity($editProductQuantityInput.valueAsNumber);

      const editedProduct: Product = {
        name: $editProductNameInput.value,
        price: $editProductPriceInput.valueAsNumber,
        quantity: $editProductQuantityInput.valueAsNumber,
      };

      const previousProductName = $editProductTarget.dataset.productName;

      this.vendingMachineProductManager.editProduct(
        previousProductName,
        editedProduct
      );

      $editProductTarget.innerHTML = generateTemplate(editedProduct);
      $editProductTarget.dataset.productName = $editProductNameInput.value;

      renderSnackBar(
        this.$snackBarContainer,
        SUCCESS_MESSAGE.EDITED_PRODUCT,
        'success'
      );

      emit(this.$productTableTbody, '@editConsumerProduct', {
        detail: {
          previousProductName,
          editedProduct,
        },
      });
    } catch ({ message }) {
      focusWrongInput({
        message,
        $nameInput: $editProductNameInput,
        $priceInput: $editProductPriceInput,
        $quantityInput: $editProductQuantityInput,
      });

      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  }

  private readyEditProduct(target: HTMLButtonElement): void {
    const $parentTarget: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const targetProductInfo: Product =
      this.vendingMachineProductManager.getTargetProduct(
        $parentTarget.dataset.productName
      );

    $parentTarget.innerHTML = generateEditTemplate(targetProductInfo);

    focusEditInput(
      $<HTMLInputElement>(
        '.product-table__product-name-input--edit',
        $parentTarget
      )
    );
  }

  private deleteProduct(target: HTMLButtonElement): void {
    const $deleteProduct: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const $parentTarget: HTMLElement = target.closest('tbody');
    const deleteProductName = $deleteProduct.dataset.productName;

    if (!window.confirm(DELETE_PRODUCT_CONFIRM_MESSAGE(deleteProductName))) {
      return;
    }

    this.vendingMachineProductManager.deleteProduct(deleteProductName);

    $parentTarget.removeChild($deleteProduct);

    renderSnackBar(
      this.$snackBarContainer,
      SUCCESS_MESSAGE.DELETED_PRODUCT,
      'success'
    );

    emit(this.$productTableTbody, '@deleteConsumerProduct', {
      detail: {
        deleteProductName,
      },
    });
  }

  private onKeyupProductList = ({ target, key }): void => {
    if (!target.matches('.product-table__input--edit')) return;
    if (key !== 'Enter') return;

    this.approveEditProduct(target);
  };

  private onClickProductList = ({ target }): void => {
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
