import { on, renderSnackBar } from '../../dom';
import {
  checkValidLengthProductName,
  checkValidProductPrice,
  checkValidProductQuantity,
} from '../../utils/utils';

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
    <td>
      <input type="text" name="product" minlength="1" maxlength="10" class="product-table__input--edit product-table__product-name-input--edit" value="${productName}" autofocus required />
    </td>
    <td><input type="number" class="product-table__input--edit product-table__product-price-input--edit" value="${productPrice}" step="10" min="100" max="10000" required /></td>
    <td><input type="number" class="product-table__input--edit product-table__product-quantity-input--edit" value="${productQuantity}" min="1" max="20" required /></td>
    <td class="product-table__button-wrapper hide">
      <button class="product-table__edit-button hide">수정</button>
    </td>
    <td class="product-table__button-wrapper">
      <button class="product-table__confirm-button" type="submit">확인</button>
    </td>
  </tr>
`;

export default class ProductStateComponent {
  vendingMachineProductManager;
  productTableTbody;
  private $snackBarContainer: HTMLElement = document.querySelector(
    '.snack-bar-container'
  );

  constructor(vendingMachineProductManager) {
    this.vendingMachineProductManager = vendingMachineProductManager;
    this.productTableTbody = document.querySelector('.product-table tbody');

    on(
      document.querySelector('.product-info-form__button'),
      '@productInputSubmit',
      this.render
    );
    this.productTableTbody.addEventListener('click', this.onClickEditButton);
    this.productTableTbody.addEventListener('click', this.onClickDeleteButton);
    this.productTableTbody.addEventListener(
      'click',
      this.onClickEditSubmitButton
    );
  }

  render = ({ detail }) => {
    this.productTableTbody.insertAdjacentHTML(
      'beforeend',
      generateTemplate(detail)
    );
  };

  onClickEditButton = ({ target }) => {
    if (!target.matches('.product-table__edit-button')) return;

    const parentElement = target.closest('.product-table__info-tr');
    const targetProduct = this.vendingMachineProductManager.getTargetProduct(
      parentElement.dataset.productName
    );

    parentElement.innerHTML = generateEditTemplate(targetProduct);
    const $targetInput = parentElement.querySelector(
      '.product-table__product-name-input--edit'
    );
    $targetInput.focus();
    $targetInput.setSelectionRange(
      $targetInput.value.length,
      $targetInput.value.length
    );
  };

  onClickEditSubmitButton = ({ target }) => {
    if (!target.matches('.product-table__confirm-button')) return;

    const parentElement = target.closest('.product-table__info-tr');
    const editProductNameInput: HTMLInputElement = document.querySelector(
      '.product-table__product-name-input--edit'
    );
    const editProductPriceInput: HTMLInputElement = document.querySelector(
      '.product-table__product-price-input--edit'
    );
    const editProductQuantityInput: HTMLInputElement = document.querySelector(
      '.product-table__product-quantity-input--edit'
    );

    try {
      checkValidLengthProductName(editProductNameInput.value);
      checkValidProductPrice(editProductPriceInput.valueAsNumber);
      checkValidProductQuantity(editProductQuantityInput.valueAsNumber);
      const editedProduct = {
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

  onClickDeleteButton = ({ target }) => {
    if (!target.matches('.product-table__delete-button')) return;

    const parentElement = target.closest('.product-table__info-tr');
    const grandParentElement = target.closest('tbody');
    this.vendingMachineProductManager.deleteProduct(
      parentElement.dataset.productName
    );

    if (!confirm('이 상품을 삭제 하시겠습니까?')) {
      return;
    }

    grandParentElement.removeChild(parentElement);
  };
}
