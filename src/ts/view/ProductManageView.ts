import { VendingMachineInterface } from '../domain/VendingMachine';
import { $, $$ } from '../utils';
import { CONFIRM_MESSAGE } from '../constants';
import ProductType from '../type/ProductType';

export interface ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  vendingMachine: VendingMachineInterface;

  handleEdit(target: HTMLButtonElement): void;
  handleSubmit(event: SubmitEvent): void;
  handleDelete(target: HTMLButtonElement): void;
  renderProductManage(): void;
  removeProductRow(name: string): void;
  handleConfirmEdit(name: string): void;
  getProductTemplate(productType: ProductType): string;
  renderEditedProduct(productToEdit: ProductType, targetEdit: HTMLTableCellElement): void;
  getEditTemplate({ name, price, quantity }: ProductType): string;
  resetProductManageForm(): void;
}

export default class ProductManageView implements ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  $currentProductTable: HTMLTableSectionElement;
  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$productNameInput = <HTMLInputElement>$('#product-name');
    this.$productPriceInput = <HTMLInputElement>$('#product-price');
    this.$productQuantityInput = <HTMLInputElement>$('#product-quantity');
    this.$productManageForm = <HTMLFormElement>$('.product-manage-form');
    this.$currentProductTable = <HTMLTableSectionElement>$('#current-product-table');
    this.vendingMachine = vendingMachine;

    this.$productManageForm.addEventListener('submit', this.handleSubmit);
    this.$currentProductTable.addEventListener('click', this.handleModifierButton);
    this.renderInitialProductManage();
  }

  getEditTemplate = ({ name, price, quantity }: ProductType) => {
    return `
      <td class="product-row-name">
        <input class="edit-input" id="edit-name-input" type="text" size="10" minlength="1" maxlength="10" value="${name}">
      </td>
      <td class="product-row-price">
        <input class="edit-input" id="edit-price-input" type="number" step="10" min="100" max="100000" value="${price}">
      </td>
      <td class="product-row-quantity">
        <input class="edit-input" id="edit-quantity-input" type="number" min="1" max="20" value="${quantity}">
      </td>
      <td>
        <button class="small-button edit-confirm-button" data-name="${name}" >확인</button>
      </td>
    `;
  };

  handleEdit = (target: HTMLButtonElement) => {
    const { name, price, quantity } = this.vendingMachine.getProductByName(target.dataset.name);
    const editTemplate = this.getEditTemplate({ name, price, quantity });
    const newTr = document.createElement('tr');
    newTr.className = 'product-row';
    newTr.dataset.name = name;
    newTr.insertAdjacentHTML('beforeend', editTemplate);

    const targetEdit = $(`tr[data-name=${name}]`);
    this.$currentProductTable.replaceChild(newTr, targetEdit);

    $('.edit-confirm-button').addEventListener('click', () => this.handleConfirmEdit(name));
  };

  renderEditedProduct = (productToEdit: ProductType, targetEdit: HTMLTableCellElement) => {
    const editedProduct = this.vendingMachine.getProductByName(productToEdit.name);
    const newTr = document.createElement('tr');
    newTr.className = 'product-row';
    newTr.dataset.name = editedProduct.name;
    const template = this.getProductTemplate(editedProduct);
    newTr.insertAdjacentHTML('beforeend', template);

    this.$currentProductTable.replaceChild(newTr, targetEdit);
  };

  handleConfirmEdit = (targetName: string) => {
    const targetEdit = $(`tr[data-name=${targetName}]`);
    const productToEdit = {
      name: (<HTMLInputElement>$('#edit-name-input')).value,
      price: +(<HTMLInputElement>$('#edit-price-input')).value,
      quantity: +(<HTMLInputElement>$('#edit-quantity-input')).value,
    };
    try {
      this.vendingMachine.editProduct(targetName, productToEdit);
      this.renderEditedProduct(productToEdit, <HTMLTableCellElement>targetEdit);
    } catch (error) {
      alert(error.message);
    }
  };

  handleDelete = (target: HTMLButtonElement) => {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      const name = target.dataset.name;
      this.vendingMachine.deleteProduct(name);
      this.removeProductRow(name);
    }
  };

  removeProductRow(name: string) {
    const targetDelete = $(`tr[data-name=${name}]`);
    this.$currentProductTable.removeChild(targetDelete);
  }

  handleModifierButton = (event: PointerEvent) => {
    const target = <HTMLButtonElement>event.target;

    if (target.classList.contains('edit-button')) {
      this.handleEdit(target);
      return;
    }
    if (target.classList.contains('delete-button')) {
      this.handleDelete(target);
    }
  };

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    const input = {
      name: this.$productNameInput.value.trim(),
      price: +this.$productPriceInput.value,
      quantity: +this.$productQuantityInput.value,
    };

    try {
      const addedProduct = this.vendingMachine.addProduct(input);
      this.renderAddedProduct(addedProduct);
      this.resetProductManageForm();
    } catch (error) {
      alert(error.message);
    }
  };

  resetProductManageForm() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
    this.$productQuantityInput.value = '';
    this.$productNameInput.focus();
  }

  getProductTemplate = ({ name, price, quantity }) => {
    return `
      <tr class="product-row" data-name="${name}">
        <td class="product-row-name">${name}</td>
        <td class="product-row-price">${price}</td>
        <td class="product-row-quantity">${quantity}</td>
        <td>
          <button class="small-button edit-button" data-name="${name}">수정</button>
          <button class="small-button delete-button" data-name="${name}">삭제</button>
        </td>
      </tr>
      `;
  };

  renderAddedProduct = (addedProduct: ProductType) => {
    const template = this.getProductTemplate(addedProduct);
    this.$currentProductTable.insertAdjacentHTML('beforeend', template);
  };

  renderProductManage = () => {
    const $$productRows = $$('.product-row');
    const allProducts = this.vendingMachine.products;
    allProducts.forEach((product, index) => {
      (<HTMLTableCellElement>(
        $('.product-row-name', <HTMLElement>$$productRows[index])
      )).textContent = product.name;
      (<HTMLTableCellElement>(
        $('.product-row-price', <HTMLElement>$$productRows[index])
      )).textContent = String(product.price);
      (<HTMLTableCellElement>(
        $('.product-row-quantity', <HTMLElement>$$productRows[index])
      )).textContent = String(product.quantity);
    });
    this.$productNameInput.focus();
  };

  renderInitialProductManage = () => {
    const template = this.vendingMachine.products
      .map((product) => this.getProductTemplate(product))
      .join('');
    this.$currentProductTable.insertAdjacentHTML('beforeend', template);
  };
}
