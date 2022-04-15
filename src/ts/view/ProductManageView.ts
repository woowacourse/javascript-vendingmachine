import { VendingMachineInterface } from '../domain/VendingMachine';
import { $ } from '../utils';
import { alertSnackBar } from '../snackbar';
import { CONFIRM_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import ProductType from '../type/ProductType';
import { ProductInterface } from '../domain/Product';

export interface ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  vendingMachine: VendingMachineInterface;

  renderProductManage(): void;
  handleSubmit(event: SubmitEvent): void;
  renderAddedProduct(addedProduct: ProductInterface): void;
  resetProductManageForm(): void;
  handleModifierButton(event: PointerEvent): void;
  handleEdit(target: HTMLButtonElement): void;
  getEditTemplate({ name, price, quantity }: ProductType): string;
  handleConfirmEdit(name: string): void;
  renderEditedProduct(productToEdit: ProductType, targetEdit: HTMLTableCellElement): void;
  getProductTemplate(productType: ProductType): string;
  handleDelete(target: HTMLButtonElement): void;
  removeProductRow(name: string): void;
}

export default class ProductManageView implements ProductManageViewInterface {
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  $currentProductTable: HTMLTableSectionElement;
  vendingMachine: VendingMachineInterface;

  constructor(vendingMachine: VendingMachineInterface) {
    this.$productManageForm = $('.product-manage-form');
    this.$productNameInput = $('#product-name', this.$productManageForm);
    this.$productPriceInput = $('#product-price', this.$productManageForm);
    this.$productQuantityInput = $('#product-quantity', this.$productManageForm);
    this.$currentProductTable = $('#current-product-table');
    this.vendingMachine = vendingMachine;

    this.$productManageForm.addEventListener('submit', this.handleSubmit);
    this.$currentProductTable.addEventListener('click', this.handleModifierButton);
    this.renderProductManage();
  }

  renderProductManage = () => {
    const template = this.vendingMachine.products
      .map((product) => this.getProductTemplate(product))
      .join('');

    this.$currentProductTable.innerHTML = template;
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
      alertSnackBar(SUCCESS_MESSAGE.ADD_PRODUCT);
    } catch (error) {
      alertSnackBar(error.message);
    }
  };

  renderAddedProduct = (addedProduct: ProductInterface) => {
    const template = this.getProductTemplate(addedProduct);

    this.$currentProductTable.insertAdjacentHTML('beforeend', template);
  };

  resetProductManageForm() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
    this.$productQuantityInput.value = '';
    this.$productNameInput.focus();
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

  handleEdit = (target: HTMLButtonElement) => {
    const { name, price, quantity } = this.vendingMachine.getProduct(target.dataset.name);
    const editTemplate = this.getEditTemplate({ name, price, quantity });

    const newTr = document.createElement('tr');
    newTr.className = 'product-row';
    newTr.dataset.name = name;
    newTr.insertAdjacentHTML('beforeend', editTemplate);

    const targetEdit = $(`tr[data-name="${name}"]`);
    this.$currentProductTable.replaceChild(newTr, targetEdit);

    $('.edit-confirm-button').addEventListener('click', () => this.handleConfirmEdit(name));
  };

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

  handleConfirmEdit = (targetName: string) => {
    const targetEdit = $(`tr[data-name="${targetName}"]`);
    const productToEdit = {
      name: (<HTMLInputElement>$('#edit-name-input')).value,
      price: +(<HTMLInputElement>$('#edit-price-input')).value,
      quantity: +(<HTMLInputElement>$('#edit-quantity-input')).value,
    };

    try {
      this.vendingMachine.editProduct(targetName, productToEdit);
      this.renderEditedProduct(productToEdit, <HTMLTableCellElement>targetEdit);
      alertSnackBar(SUCCESS_MESSAGE.EDIT_PRODUCT);
    } catch (error) {
      alertSnackBar(error.message);
    }
  };

  renderEditedProduct = (productToEdit: ProductType, targetEdit: HTMLTableCellElement) => {
    const editedProduct = this.vendingMachine.getProduct(productToEdit.name);

    const newTr = document.createElement('tr');
    newTr.className = 'product-row';
    newTr.dataset.name = editedProduct.name;

    const template = this.getProductTemplate(editedProduct);
    newTr.insertAdjacentHTML('beforeend', template);

    this.$currentProductTable.replaceChild(newTr, targetEdit);
  };

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

  handleDelete = (target: HTMLButtonElement) => {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      const name = target.dataset.name;
      this.vendingMachine.deleteProduct(name);
      this.removeProductRow(name);
      alertSnackBar(SUCCESS_MESSAGE.DELETE_PRODUCT);
    }
  };

  removeProductRow(name: string) {
    const targetDelete = $(`tr[data-name="${name}"]`);
    this.$currentProductTable.removeChild(targetDelete);
  }
}
