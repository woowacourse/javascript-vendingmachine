import { product } from '../../types/vendingMachineProductManager';

import { on, renderSnackBar, $, focusEditInput } from '../../dom';
import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../utils/utils';
import {
  PRODUCT_NAME,
  PRODUCT_PRICE,
  PRODUCT_QUANTITY,
  DELETE_PRODUCT_CONFIRM_MESSAGE,
} from '../../constants';

const generateTemplate = ({
  name: productName,
  price: productPrice,
  quantity: productQuantity,
}): string => `
  <tr class="product-table__info-tr" data-product-name="${productName}">
    <td>${productName}</td>
    <td>${productPrice}</td>
    <td>${productQuantity}개</td>
    <td class="product-table__button-wrapper flex-gap05">
      <button class="product-table__edit-button">수정</button>
      <button class="product-table__delete-button">삭제</button>
    </td>
    <td class="product-table__button-wrapper hide">
      <button class="product-table__confirm-button">확인</button>
    </td>
  </tr>
`;

const generateEditTemplate = ({
  name: productName,
  price: productPrice,
  quantity: productQuantity,
}): string => `
  <tr class="product-table__info-tr" data-product-name="${productName}">
    <td><input type="text" name="product" class="product-table__input--edit product-table__product-name-input--edit" minlength="${PRODUCT_NAME.MIN_LENGTH}" maxlength="${PRODUCT_NAME.MAX_LENGTH}" value="${productName}" autofocus required /></td>
    <td><input type="number" class="product-table__input--edit product-table__product-price-input--edit" value="${productPrice}" step="${PRODUCT_PRICE.UNIT}" min="${PRODUCT_PRICE.MIN_PRICE}" max="${PRODUCT_PRICE.MAX_PRICE}" required /></td>
    <td><input type="number" class="product-table__input--edit product-table__product-quantity-input--edit" value="${productQuantity}" min="${PRODUCT_QUANTITY.MIN_QUANTITY}" max="${PRODUCT_QUANTITY.MAX_QUANTITY}" required /></td>
    <td class="product-table__button-wrapper hide">
      <button class="product-table__edit-button hide">수정</button>
    </td>
    <td class="product-table__button-wrapper">
      <button class="product-table__confirm-button" type="submit">확인</button>
    </td>
  </tr>
`;

export default class ProductStateComponent {
  private productTableTbody: HTMLElement = $('.product-table tbody');
  private $snackBarContainer: HTMLElement = $('.snack-bar-container');

  constructor(private vendingMachineProductManager) {
    on($('.product-info-form__button'), '@productInputSubmit', this.render);
    on(this.productTableTbody, 'click', this.onClickEditButton);
    on(this.productTableTbody, 'click', this.onClickDeleteButton);
    on(this.productTableTbody, 'click', this.onClickEditSubmitButton);
  }

  private render = ({ detail: { newProduct } }): void => {
    this.productTableTbody.insertAdjacentHTML(
      'beforeend',
      generateTemplate(newProduct)
    );
  };

  private onClickEditButton = ({ target }): void => {
    if (!target.matches('.product-table__edit-button')) return;

    const parentElement: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const targetProduct: product =
      this.vendingMachineProductManager.getTargetProduct(
        parentElement.dataset.productName
      );

    parentElement.innerHTML = generateEditTemplate(targetProduct);

    focusEditInput(
      parentElement.querySelector('.product-table__product-name-input--edit')
    );
  };

  private onClickEditSubmitButton = ({ target }): void => {
    if (!target.matches('.product-table__confirm-button')) return;

    const parentElement: HTMLTableRowElement = target.closest(
      '.product-table__info-tr'
    );
    const editProductNameInput = $(
      '.product-table__product-name-input--edit'
    ) as HTMLInputElement;
    const editProductPriceInput = $(
      '.product-table__product-price-input--edit'
    ) as HTMLInputElement;
    const editProductQuantityInput = $(
      '.product-table__product-quantity-input--edit'
    ) as HTMLInputElement;

    try {
      checkValidLengthProductName(editProductNameInput.value);
      checkValidProductPrice(editProductPriceInput.valueAsNumber);
      checkValidProductQuantity(editProductQuantityInput.valueAsNumber);

      const editedProduct: product = {
        name: editProductNameInput.value,
        price: editProductPriceInput.valueAsNumber,
        quantity: editProductQuantityInput.valueAsNumber,
      };

      this.vendingMachineProductManager.editProduct(
        parentElement.dataset.productName,
        editedProduct
      );

      parentElement.innerHTML = generateTemplate(editedProduct);
      parentElement.dataset.productName = editProductNameInput.value;
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message);
    }
  };

  private onClickDeleteButton = ({ target }): void => {
    if (!target.matches('.product-table__delete-button')) return;

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
  };
}
