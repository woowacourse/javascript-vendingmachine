import { checkCanSubtractConsumerChargeMoney } from '../../validation/checkConsumerChargeMoney';

import SUCCESS_MESSAGE from '../../constants/successMessage';

import renderSnackBar from '../../dom/snackBar';
import { on, $, $$, emit } from '../../dom/domHelper';
import { SNACK_BAR_TYPE } from '../../constants/snackBar';

const generateAddProductTemplate = ({ name, price, quantity }) => `
  <tr class="product-table__info-tr consumer-product-table__info-tr">
    <td class="product-table__purchase-product-name">${name}</td>
    <td class="product-table__purchase-product-price">${price}</td>
    <td>
      <span class="product-table__purchase-product-quantity">${quantity}</span>개
    </td>
    <td class="product-table__button-wrapper">
      <button class="product-table__purchase-button">구매</button>
    </td>
  </tr>
`;

export default class ConsumerProductStateComponent {
  private $productAddButton = $<HTMLButtonElement>(
    '.product-info-form__add-button'
  );
  private $consumerProductTableTbody = $<HTMLElement>(
    '.consumer-product-table__tbody'
  );
  private $productTableTbody = $<HTMLElement>('.product-table tbody');
  private $snackBarContainer = $<HTMLLabelElement>('.snack-bar-container');

  constructor(private vendingMachineConsumerMoneyManager) {
    on(this.$consumerProductTableTbody, 'click', this.onClickPurchaseButton);

    on(
      this.$productAddButton,
      '@addConsumerProduct',
      this.renderAddConsumerProduct
    );
    on(
      this.$productTableTbody,
      '@editConsumerProduct',
      this.renderEditConsumerProduct
    );
    on(
      this.$productTableTbody,
      '@deleteConsumerProduct',
      this.renderDeleteConsumerProduct
    );
  }

  renderAddConsumerProduct = ({ detail: { newProduct } }) => {
    this.$consumerProductTableTbody.insertAdjacentHTML(
      'beforeend',
      generateAddProductTemplate(newProduct)
    );
  };

  renderEditConsumerProduct = ({
    detail: { editedProduct, previousProductName },
  }) => {
    const currentProducts = Array.from(
      $$<HTMLElement>('.product-table__purchase-product-name')
    );

    const $editProductNameTarget = currentProducts.find(
      (product) => product.textContent === previousProductName
    );

    const $parentTarget = $editProductNameTarget.closest(
      '.consumer-product-table__info-tr'
    );
    const $targetProductName = $parentTarget.querySelector(
      '.product-table__purchase-product-name'
    );
    const $targetProductPrice = $parentTarget.querySelector(
      '.product-table__purchase-product-price'
    );
    const $targetProductQuantity = $parentTarget.querySelector(
      '.product-table__purchase-product-quantity'
    );

    $targetProductName.textContent = editedProduct.name;
    $targetProductPrice.textContent = editedProduct.price;
    $targetProductQuantity.textContent = editedProduct.quantity;
  };

  renderDeleteConsumerProduct = ({ detail: { deleteProductName } }) => {
    const $$currentProducts = Array.from(
      $$<HTMLElement>('.product-table__purchase-product-name')
    );

    const $deleteProductNameTarget = $$currentProducts.find(
      (product) => product.textContent === deleteProductName
    );
    const $deleteProduct = $deleteProductNameTarget.closest(
      '.consumer-product-table__info-tr'
    );

    $deleteProduct.remove();
  };

  onClickPurchaseButton = ({ target }) => {
    if (!target.matches('.product-table__purchase-button')) return;

    const targetPurchaseProductName = $<HTMLElement>(
      '.product-table__purchase-product-name',
      target.closest('.product-table__info-tr')
    ).textContent;
    const targetPurchaseProductPrice = $<HTMLElement>(
      '.product-table__purchase-product-price',
      target.closest('.product-table__info-tr')
    ).textContent;
    const $targetPurchaseProductQuantity = $<HTMLElement>(
      '.product-table__purchase-product-quantity',
      target.closest('.product-table__info-tr')
    );

    try {
      checkCanSubtractConsumerChargeMoney(
        this.vendingMachineConsumerMoneyManager.getConsumerChargeMoney(),
        Number(targetPurchaseProductPrice)
      );

      const currentTargetQuantity = String(
        Number($targetPurchaseProductQuantity.textContent) - 1
      );

      $targetPurchaseProductQuantity.textContent = currentTargetQuantity;

      if (Number(currentTargetQuantity) <= 0) {
        target.disabled = true;
        target.classList.add('disabled');
      }

      const editProduct = {
        name: targetPurchaseProductName,
        price: targetPurchaseProductPrice,
        quantity: $targetPurchaseProductQuantity.textContent,
      };

      renderSnackBar(
        this.$snackBarContainer,
        SUCCESS_MESSAGE.PURCHASED_PRODUCT(targetPurchaseProductName),
        SNACK_BAR_TYPE.SUCCESS
      );

      emit(this.$consumerProductTableTbody, '@subtractProductQuantity', {
        detail: {
          editProduct,
        },
      });
      emit(this.$consumerProductTableTbody, '@subtractConsumerChargeMoney', {
        detail: {
          subtractPrice: targetPurchaseProductPrice,
        },
      });
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, SNACK_BAR_TYPE.ERROR);
    }
  };
}
