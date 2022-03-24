import { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';

export interface ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  vendingMachine: VendingMachineInterface;
  submitHandler(event: any): void;
}

class ProductManageView implements ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$productNameInput = $('#product-name');
    this.$productPriceInput = $('#product-price');
    this.$productQuantityInput = $('#product-quantity');
    this.$productManageForm = $('.product-manage-form');
    this.vendingMachine = vendingMachine;

    this.$productManageForm.addEventListener('submit', this.submitHandler);
  }

  submitHandler = (event: SubmitEvent) => {
    event.preventDefault();

    const input = {
      name: this.$productNameInput.value,
      price: +this.$productPriceInput.value,
      quantity: +this.$productQuantityInput.value,
    };

    try {
      this.vendingMachine.addProduct(input);
      console.log('success!! ', input);
    } catch (error) {
      alert(error.message);
    }
  };
}

export default ProductManageView;
