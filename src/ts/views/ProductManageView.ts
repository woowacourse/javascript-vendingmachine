import { VendingMachineInterface } from '../domains/VendingMachine';
import { $ } from '../utils';
import { CONFIRM_MESSAGE, SUCCESS_MESSAGE } from '../constants';
import ProductType from '../types/ProductType';
import { renderToastModal } from '../components/ToastNotification';

export default class ProductManageView {
  vendingMachine: VendingMachineInterface;
  $productNameInput: HTMLInputElement;
  $productPriceInput: HTMLInputElement;
  $productQuantityInput: HTMLInputElement;
  $productManageForm: HTMLFormElement;
  $currentProductTable: HTMLTableSectionElement;
  $toastModal: HTMLElement;

  constructor(vendingMachine: VendingMachineInterface) {
    this.vendingMachine = vendingMachine;
    this.$productNameInput = <HTMLInputElement>$('#product-name');
    this.$productPriceInput = <HTMLInputElement>$('#product-price');
    this.$productQuantityInput = <HTMLInputElement>$('#product-quantity');
    this.$productManageForm = <HTMLFormElement>$('#product-manage-form');
    this.$currentProductTable = <HTMLTableSectionElement>$('#current-product-table');
    this.$toastModal = <HTMLElement>$('toast-modal');

    this.$productManageForm.addEventListener('submit', this.handleSubmit);
    this.$currentProductTable.addEventListener('click', this.handleModifierButton);
    this.renderProductManageTab();
  }

  public renderProductManageTab = () => {
    this.$currentProductTable.textContent = '';
    const tableTemplate = this.vendingMachine.products
      .map((product) => this.getProductTemplate(product))
      .join('');
    this.$currentProductTable.insertAdjacentHTML('beforeend', tableTemplate);

    this.$productNameInput.focus();
  };

  private handleSubmit = (event: SubmitEvent) => {
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
      renderToastModal('success', SUCCESS_MESSAGE.PRODUCT_REGISTERED);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };

  private renderAddedProduct = (addedProduct: ProductType) => {
    const template = this.getProductTemplate(addedProduct);
    this.$currentProductTable.insertAdjacentHTML('beforeend', template);
  };

  private getProductTemplate = ({ name, price, quantity }) => {
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

  private resetProductManageForm() {
    this.$productNameInput.value = '';
    this.$productPriceInput.value = '';
    this.$productQuantityInput.value = '';
    this.$productNameInput.focus();
  }

  private handleModifierButton = (event: PointerEvent) => {
    const target = <HTMLButtonElement>event.target;

    if (target.classList.contains('edit-button')) {
      this.handleEdit(target);
    }
    if (target.classList.contains('delete-button')) {
      this.handleDelete(target);
    }
  };

  private handleEdit = (target: HTMLButtonElement) => {
    const { name, price, quantity } = this.vendingMachine.getProduct(target.dataset.name);
    const editTemplate = this.getEditTemplate({ name, price, quantity });
    const targetEdit = $(`tr[data-name='${name}']`);
    targetEdit.replaceChildren();
    targetEdit.insertAdjacentHTML('beforeend', editTemplate);
    $('.edit-confirm-button').addEventListener('click', () => this.handleConfirmEdit(name));
  };

  private getEditTemplate = ({ name, price, quantity }: ProductType) => {
    return `
      <tr class="product-row" dataset-name=${name} >
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
      </tr>
    `;
  };

  private handleConfirmEdit = (targetName: string) => {
    const targetEdit = $(`tr[data-name='${targetName}']`);
    const productToEdit = {
      name: (<HTMLInputElement>$('#edit-name-input')).value,
      price: +(<HTMLInputElement>$('#edit-price-input')).value,
      quantity: +(<HTMLInputElement>$('#edit-quantity-input')).value,
    };
    try {
      this.vendingMachine.editProduct(targetName, productToEdit);
      this.renderEditedProduct(productToEdit, <HTMLTableCellElement>targetEdit);
      renderToastModal('success', SUCCESS_MESSAGE.PRODUCT_EDITED);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };

  private renderEditedProduct = (productToEdit: ProductType, targetEdit: HTMLTableCellElement) => {
    const editedProduct = this.vendingMachine.getProduct(productToEdit.name);
    const newTr = document.createElement('tr');
    newTr.className = 'product-row';
    newTr.dataset.name = editedProduct.name;
    const template = this.getProductTemplate(editedProduct);
    newTr.insertAdjacentHTML('beforeend', template);

    this.$currentProductTable.replaceChild(newTr, targetEdit);
  };

  private handleDelete = (target: HTMLButtonElement) => {
    if (window.confirm(CONFIRM_MESSAGE.DELETE)) {
      const name = target.dataset.name;
      this.vendingMachine.deleteProduct(name);
      this.removeProductRow(name);
      renderToastModal('success', SUCCESS_MESSAGE.PRODUCT_DELETED);
    }
  };

  private removeProductRow(name: string) {
    const targetDelete = $(`tr[data-name='${name}']`);
    this.$currentProductTable.removeChild(targetDelete);
  }
}
