import { confirmMessage } from '../constants';
import { createMainElement, selectDom } from '../utils/dom';
import { emitEvent } from '../utils/event';
import {
  manageProductTemplate,
  productTableRow,
  updateProductTableRow,
} from './template';

export default class ManageProductTab {
  #vendingMachine;
  #manageContainer;
  #addProductForm;
  #addProductNameInput;
  #addProductPriceInput;
  #addProductStockInput;
  #productStatusTable;

  // eslint-disable-next-line max-lines-per-function
  constructor(machine) {
    this.#vendingMachine = machine;
    this.#manageContainer = createMainElement(manageProductTemplate);
    this.#addProductForm = selectDom('#add-product-form', this.#manageContainer);
    this.#addProductNameInput = selectDom(
      '#add-product-name-input',
      this.#manageContainer
    );
    this.#addProductPriceInput = selectDom(
      '#add-product-price-input',
      this.#manageContainer
    );
    this.#addProductStockInput = selectDom(
      '#add-product-stock-input',
      this.#manageContainer
    );
    this.#productStatusTable = selectDom('#product-status-table', this.#manageContainer);
    this.#renderInitProductList();
    this.#addProductForm.addEventListener('submit', this.#handleAddProductForm);
    this.#productStatusTable.addEventListener('click', this.#handleProductStatus);
  }

  get element() {
    return this.#manageContainer;
  }

  #renderInitProductList() {
    Object.entries(this.#vendingMachine.productList).forEach(
      ([id, { name, price, stock }]) => {
        this.#productStatusTable.insertAdjacentHTML(
          'beforeend',
          productTableRow({ name, price, stock, id })
        );
      }
    );
  }

  #handleAddProductForm = (e) => {
    e.preventDefault();
    const name = this.#addProductNameInput.value;
    const price = this.#addProductPriceInput.valueAsNumber;
    const stock = this.#addProductStockInput.valueAsNumber;
    emitEvent(this.#manageContainer, 'addProduct', { name, price, stock });
  };

  addProduct({ name, price, stock, id }) {
    this.#productStatusTable.insertAdjacentHTML(
      'beforeend',
      productTableRow({ name, price, stock, id })
    );
    this.#resetInput();
  }

  #resetInput() {
    this.#addProductNameInput.value = '';
    this.#addProductPriceInput.value = '';
    this.#addProductStockInput.value = '';
    this.#addProductNameInput.focus();
  }

  #handleProductStatus = ({ target }) => {
    const { classList } = target;

    if (classList.contains('update-product-button')) {
      this.#handleProductUpdate(target);
    }

    if (classList.contains('remove-product-button') && window.confirm(confirmMessage())) {
      this.#handleProductRemove(target);
    }

    if (classList.contains('confirm-update-button')) {
      this.#handleProductUpdateConfirm(target);
    }
  };

  #handleProductUpdate = (target) => {
    const targetTableRow = target.closest('tr');
    const name = selectDom('.product-name', targetTableRow).textContent;
    const price = selectDom('.product-price', targetTableRow).textContent;
    const stock = selectDom('.product-stock', targetTableRow).textContent;
    const { productId: id } = target.dataset;

    targetTableRow.insertAdjacentHTML(
      'afterend',
      updateProductTableRow({ name, price, stock, id })
    );
    targetTableRow.remove();
  };

  #handleProductUpdateConfirm = (target) => {
    const targetTableRow = target.closest('tr');
    const name = selectDom('.update-product-name-input', targetTableRow).value;
    const price = selectDom('.update-product-price-input', targetTableRow).valueAsNumber;
    const stock = selectDom('.update-product-stock-input', targetTableRow).valueAsNumber;
    const { productId: id } = target.dataset;

    try {
      this.#vendingMachine.updateProduct(id, { name, price, stock });
      targetTableRow.insertAdjacentHTML(
        'afterend',
        productTableRow({ name, price, stock, id })
      );
      targetTableRow.remove();
    } catch ({ message }) {
      alert(message);
    }
  };

  #handleProductRemove = (target) => {
    const { productId: id } = target.dataset;

    try {
      this.#vendingMachine.removeProduct(id);
      target.closest('tr').remove();
    } catch ({ message }) {
      alert(message);
    }
  };
}
