import { on, $, emit } from '../../dom/domHelper';
import { checkCanSubtractConsumerChargeMoney } from '../../validation/checkConsumerChargeMoney';
import renderSnackBar from '../../dom/snackBar';

const generateAddProductTemplate = ({ name, price, quantity }) => `
  <tr class="product-table__info-tr">
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
  private $productTableTbody = $<HTMLElement>('.consumer-product-table__tbody');
  private $snackBarContainer = $<HTMLLabelElement>('.snack-bar-container');

  constructor(private vendingMachineConsumerMoneyManager) {
    on(
      this.$productAddButton,
      '@consumerProductState',
      this.addConsumerProduct
    );
    on(this.$productTableTbody, 'click', this.onClickPurchaseButton);
  }

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

      emit(this.$productTableTbody, '@subtractProductQuantity', {
        detail: {
          editProduct: {
            name: targetPurchaseProductName,
            price: targetPurchaseProductPrice,
            quantity: $targetPurchaseProductQuantity.textContent,
          },
        },
      });

      emit(this.$productTableTbody, '@subtractConsumerChargeMoney', {
        detail: {
          subtractPrice: targetPurchaseProductPrice,
        },
      });

      if (Number($targetPurchaseProductQuantity.textContent) <= 0) {
        target.disabled = true;
        target.classList.add('disabled');

        return;
      }
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message);
    }
  };

  addConsumerProduct = ({ detail: { newProduct } }) => {
    this.$productTableTbody.insertAdjacentHTML(
      'beforeend',
      generateAddProductTemplate(newProduct)
    );
  };
}
