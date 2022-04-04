import { on, $, $$, emit } from '../../dom/domHelper';
import { checkCanSubtractConsumerChargeMoney } from '../../validation/checkConsumerChargeMoney';
import renderSnackBar from '../../dom/snackBar';

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
    on(
      this.$productAddButton,
      '@consumerProductState',
      this.addConsumerProduct
    );
    on(this.$consumerProductTableTbody, 'click', this.onClickPurchaseButton);
    on(this.$productTableTbody, '@editProduct', this.editProduct);
    on(this.$productTableTbody, '@deleteProduct', this.deleteProduct);
  }

  deleteProduct = ({ detail: { deleteProductName } }) => {
    const currentProducts = Array.from(
      $$<HTMLElement>('.product-table__purchase-product-name')
    );

    const target = currentProducts.find(
      (product) => product.textContent === deleteProductName
    );
    const parentTarget = target.closest('.consumer-product-table__info-tr');
    const grandParentTarget = target.closest('.consumer-product-table__tbody');

    grandParentTarget.removeChild(parentTarget);
  };

  editProduct = ({ detail: { editedProduct, previousProductName } }) => {
    const currentProducts = Array.from(
      $$<HTMLElement>('.product-table__purchase-product-name')
    );

    const target = currentProducts.find(
      (product) => product.textContent === previousProductName
    );

    const parentTarget = target.closest('.consumer-product-table__info-tr');
    const targetProductName = parentTarget.querySelector(
      '.product-table__purchase-product-name'
    );
    const targetProductPrice = parentTarget.querySelector(
      '.product-table__purchase-product-price'
    );
    const targetProductQuantity = parentTarget.querySelector(
      '.product-table__purchase-product-quantity'
    );

    targetProductName.textContent = editedProduct.name;
    targetProductPrice.textContent = editedProduct.price;
    targetProductQuantity.textContent = editedProduct.quantity;
  };

  onClickPurchaseButton = ({ target }) => {
    if (!target.matches('.product-table__purchase-button')) return;

    try {
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

      checkCanSubtractConsumerChargeMoney(
        this.vendingMachineConsumerMoneyManager.getConsumerChargeMoney(),
        Number(targetPurchaseProductPrice)
      );

      $targetPurchaseProductQuantity.textContent = String(
        Number($targetPurchaseProductQuantity.textContent) - 1
      );

      emit(this.$consumerProductTableTbody, '@subtractProductQuantity', {
        detail: {
          editProduct: {
            name: targetPurchaseProductName,
            price: targetPurchaseProductPrice,
            quantity: $targetPurchaseProductQuantity.textContent,
          },
        },
      });

      emit(this.$consumerProductTableTbody, '@subtractConsumerChargeMoney', {
        detail: {
          subtractPrice: targetPurchaseProductPrice,
        },
      });

      renderSnackBar(
        this.$snackBarContainer,
        `${targetPurchaseProductName} 1개를 구입 하셨습니다. 이용해주셔서 감사합니다.`,
        'success'
      );

      if (Number($targetPurchaseProductQuantity.textContent) <= 0) {
        target.disabled = true;
        target.classList.add('disabled');

        return;
      }
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };

  addConsumerProduct = ({ detail: { newProduct } }) => {
    this.$consumerProductTableTbody.insertAdjacentHTML(
      'beforeend',
      generateAddProductTemplate(newProduct)
    );
  };
}
