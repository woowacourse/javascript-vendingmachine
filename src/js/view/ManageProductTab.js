import {
  manageProductTemplate,
  productTableRow,
  updateProductTableRow,
} from './template';

export default class ManageProductTab {
  #manageTabContainer;
  #addProductForm;
  #addProductNameInput;
  #addProductPriceInput;
  #addProductStockInput;
  #vendingMachine;
  #productStatusTable;

  constructor(machine) {
    this.#vendingMachine = machine;

    this.#manageTabContainer = document.createElement('main');
    this.#manageTabContainer.insertAdjacentHTML(
      'beforeend',
      manageProductTemplate
    );
    this.#addProductForm =
      this.#manageTabContainer.querySelector('#add-product-form');
    this.#addProductNameInput = this.#manageTabContainer.querySelector(
      '#add-product-name-input'
    );
    this.#addProductPriceInput = this.#manageTabContainer.querySelector(
      '#add-product-price-input'
    );
    this.#addProductStockInput = this.#manageTabContainer.querySelector(
      '#add-product-stock-input'
    );

    this.#productStatusTable = this.#manageTabContainer.querySelector(
      '#product-status-table'
    );

    this.#addProductForm.addEventListener('submit', this.#handleAddProductForm);
    this.#productStatusTable.addEventListener(
      'click',
      this.#handleProductStatus
    );
  }

  #handleAddProductForm = (e) => {
    e.preventDefault();

    const name = this.#addProductNameInput.value;
    const price = this.#addProductPriceInput.valueAsNumber;
    const stock = this.#addProductStockInput.valueAsNumber;

    try {
      const id = this.#vendingMachine.addProduct({ name, price, stock });

      this.#productStatusTable.insertAdjacentHTML(
        'beforeend',
        productTableRow({ name, price, stock, id })
      );
    } catch ({ message }) {
      alert(message);
    }
  };

  #handleProductStatus = ({ target }) => {
    if (target.classList.contains('update-product-button')) {
      this.#handleProductUpdate(target);
    }

    if (
      target.classList.contains('remove-product-button') &&
      window.confirm('정말 삭제하겠습니까?')
    ) {
      this.#handleProductRemove(target);
    }

    if (target.classList.contains('confirm-update-button')) {
      this.#handleProductUpdateConfirm(target);
    }
  };

  #handleProductUpdate = (target) => {
    const targetTableRow = target.closest('tr');
    const name = targetTableRow.querySelector('.product-name').textContent;
    const price = targetTableRow.querySelector('.product-price').textContent;
    const stock = targetTableRow.querySelector('.product-stock').textContent;
    targetTableRow.insertAdjacentHTML(
      'afterend',
      updateProductTableRow({
        name,
        price,
        stock,
        id: target.dataset.productId,
      })
    );
    targetTableRow.remove();
  };

  #handleProductUpdateConfirm = (target) => {
    const targetTableRow = target.closest('tr');
    const name = targetTableRow.querySelector(
      '.update-product-name-input'
    ).value;
    const price = targetTableRow.querySelector(
      '.update-product-price-input'
    ).valueAsNumber;
    const stock = targetTableRow.querySelector(
      '.update-product-stock-input'
    ).valueAsNumber;

    const { productId } = target.dataset;
    try {
      this.#vendingMachine.updateProduct(productId, { name, price, stock });
      targetTableRow.insertAdjacentHTML(
        'afterend',
        productTableRow({ name, price, stock, id: productId })
      );
      targetTableRow.remove();
    } catch ({ message }) {
      alert(message);
    }
  };

  #handleProductRemove = (target) => {
    const { productId } = target.dataset;
    try {
      this.#vendingMachine.removeProduct(productId);
      target.closest('tr').remove();
    } catch ({ message }) {
      alert(message);
    }
  };

  get tabElements() {
    return this.#manageTabContainer;
  }
}
