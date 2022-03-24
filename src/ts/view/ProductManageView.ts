import { VendingMachineInterface } from '../domain/VendingMachine';
import { $, $$ } from '../utils';

export interface ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  vendingMachine: VendingMachineInterface;
  submitHandler(event: any): void;
  renderProductManage(): void;
}

class ProductManageView implements ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  $currentProductTable: HTMLTableSectionElement;
  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$productNameInput = $('#product-name');
    this.$productPriceInput = $('#product-price');
    this.$productQuantityInput = $('#product-quantity');
    this.$productManageForm = $('.product-manage-form');
    this.$currentProductTable = $('#current-product-table');
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
      const addedProduct = this.vendingMachine.addProduct(input);
      this.renderAddedProduct(addedProduct);
    } catch (error) {
      alert(error.message);
    }
  };

  renderAddedProduct = ({ name, price, quantity }) => {
    const template = `
      <tr class="product-row">
        <td class="product-row-name">${name}</td>
        <td class="product-row-price">${price}</td>
        <td class="product-row-quantity">${quantity}</td>
        <td>
          <button class="small-button" data-name="${name}">수정</button>
          <button class="small-button" data-name="${name}">삭제</button>
        </td>
      </tr>`;
    this.$currentProductTable.insertAdjacentHTML('beforeend', template);
  };

  renderProductManage = () => {
    const $$productRows = $$('.product-row');
    const allProducts = this.vendingMachine.products;
    allProducts.forEach((product, index) => {
      $('.product-row-name', $$productRows[index]).textContent = product.name;
      $('.product-row-price', $$productRows[index]).textContent = product.price;
      $('.product-row-quantity', $$productRows[index]).textContent = product.quantity;
    });
  };
}

export default ProductManageView;
