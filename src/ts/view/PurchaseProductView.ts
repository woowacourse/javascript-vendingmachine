import { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';

export interface PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;
  $purchaseMoney: HTMLSpanElement;

  vendingMachine: VendingMachineInterface;

  renderPurchaseProduct(): void;
  handleSubmit(event: SubmitEvent): void;
}

class PurchaseProductView implements PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;
  $purchaseMoney: HTMLSpanElement;

  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine) {
    this.$purchaseForm = $('.purchase-form');
    this.$purchaseInput = $('.purchase-input', this.$purchaseForm);
    this.$purchaseMoney = $('.purchase-money', this.$purchaseForm);

    this.vendingMachine = vendingMachine;

    this.$purchaseForm.addEventListener('submit', this.handleSubmit);
  }

  renderPurchaseProduct = () => {
    this.$purchaseMoney.textContent = String(this.vendingMachine.purchaseMoney.money);
  };

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
}

export default PurchaseProductView;
