import { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';

export interface PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;
  $purchaseMoney: HTMLSpanElement;
  $availableProducts: HTMLTableSectionElement;

  vendingMachine: VendingMachineInterface;

  handleSubmit(event: SubmitEvent): void;
  renderPurchaseProduct(): void;
}

class PurchaseProductView implements PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;
  $purchaseMoney: HTMLSpanElement;
  $availableProducts: HTMLTableSectionElement;

  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine) {
    this.$purchaseForm = $('.purchase-form');
    this.$purchaseInput = $('.purchase-input', this.$purchaseForm);
    this.$purchaseMoney = $('.purchase-money', this.$purchaseForm);
    this.$availableProducts = $('.available-products-body');

    this.vendingMachine = vendingMachine;

    this.$purchaseForm.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const purchaseMoney = this.$purchaseInput.value;
    try {
      this.vendingMachine.addPurchaseMoney(+purchaseMoney);
      this.renderPurchaseProduct();
    } catch (error) {
      alert(error.message);
    }
  };

  renderPurchaseProduct = () => {
    this.$purchaseMoney.textContent = String(this.vendingMachine.purchaseMoney.money);
    this.renderAvailableProduct();
  };

  renderAvailableProduct = () => {
    const template = this.vendingMachine.products
      .map(({ name, price, quantity }) => {
        return `
          <tr class="product-row" data-name="${name}">
            <td class="product-row-name">${name}</td>
            <td class="product-row-price">${price}</td>
            <td class="product-row-quantity">${quantity}</td>
            <td>
              <button class="purchase-button small-button" data-name="${name}">구매</button>
            </td>
          </tr>
        `;
      })
      .join('');

    this.$availableProducts.innerHTML = template;
  };
}

export default PurchaseProductView;
