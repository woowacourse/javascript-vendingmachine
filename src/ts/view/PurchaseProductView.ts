import { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';

export interface PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;

  vendingMachine: VendingMachineInterface;
}

class PurchaseProductView implements PurchaseProductViewInterface {
  $purchaseForm: HTMLFormElement;
  $purchaseInput: HTMLInputElement;

  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine) {
    this.$purchaseForm = $('.purchase-form');
    this.$purchaseInput = $('.purchase-input');
    this.vendingMachine = vendingMachine;

    this.$purchaseForm.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const purchaseMoney = this.$purchaseInput.value;
    try {
      this.vendingMachine.addPurchaseMoney(+purchaseMoney);
    } catch (error) {
      alert(error.message);
    }
  };
}

export default PurchaseProductView;
