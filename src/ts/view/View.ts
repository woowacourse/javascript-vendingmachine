import { $, $$ } from '../utils';

class View {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  vendingMachine: any;

  constructor(vendingMachine: any) {
    this.$productNameInput = $('#product-name');
    this.$productPriceInput = $('#product-price');
    this.$productQuantityInput = $('#product-quantity');
    this.$productManageForm = $('.product-manage-form');
    this.vendingMachine = vendingMachine;

    this.bindEvents();
  }

  bindEvents = () => {
    this.$productManageForm.addEventListener('submit', this.submitHandler);
  };

  submitHandler = (event: any) => {
    event.preventDefault();

    const input = {
      name: this.$productNameInput.value,
      price: +this.$productPriceInput.value,
      quantity: +this.$productQuantityInput.value,
    };

    try {
      this.vendingMachine.addProduct(input);
    } catch (error) {
      alert(error.message);
    }
  };
}

export default View;
