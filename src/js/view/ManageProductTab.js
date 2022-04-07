import { CONFIRM_MESSAGE } from '../constants';
import { createMainElement, selectDom } from '../utils/dom';
import { TEMPLATE } from './template';
import Snackbar from './SnackBar';

export default class ManageProductTab {
  #vendingMachine;
  #manageContainer;
  #addProductForm;
  #addProductNameInput;
  #addProductPriceInput;
  #addProductStockInput;
  #productStatusTable;

  constructor(machine) {
    //멤버변수 생성
    this.#vendingMachine = machine;

    this.#manageContainer = createMainElement(TEMPLATE.MANAGE_PRODUCT);
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

    //이벤트 바인딩
    this.#addProductForm.addEventListener('submit', this.#handleAddProductForm);
    this.#productStatusTable.addEventListener('click', this.#handleProductStatus);
  }

  get tabElements() {
    this.#renderStockStatus();
    return this.#manageContainer;
  }

  #renderStockStatus() {
    const { productList } = this.#vendingMachine;

    for (let id of Object.keys(productList)) {
      const { stock } = productList[id];

      const element = selectDom(
        `.product-stock[data-product-id="${id}"]`,
        this.#manageContainer
      );

      element.textContent = stock;
    }
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
        TEMPLATE.PRODUCT_TABLE_ROW({ name, price, stock, id })
      );
      this.#resetInput();
      Snackbar.dispatch('상품이 정상적으로 추가되었습니다.');
    } catch ({ message }) {
      Snackbar.dispatch(message, 'fail');
    }
  };

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
      return;
    }

    if (classList.contains('remove-product-button')) {
      this.#handleProductRemove(target);
      return;
    }

    if (classList.contains('confirm-update-button')) {
      this.#handleProductUpdateConfirm(target);
      return;
    }

    if (classList.contains('cancel-update-button')) {
      this.#handleProductUpdateCancel(target);
      return;
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
      TEMPLATE.UPDATE_PRODUCT_TABLE_ROW({ name, price, stock, id })
    );
    targetTableRow.remove();
  };

  #handleProductRemove = (target) => {
    const targetTableRow = target.closest('tr');
    const productName = selectDom('.product-name', targetTableRow).textContent;

    if (window.confirm(productName + CONFIRM_MESSAGE)) {
      const { productId: id } = target.dataset;

      try {
        this.#vendingMachine.removeProduct(id);
        target.closest('tr').remove();
        Snackbar.dispatch('상품이 정상적으로 삭제되었습니다.');
      } catch ({ message }) {
        Snackbar.dispatch(message, 'fail');
      }
    }
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
        TEMPLATE.PRODUCT_TABLE_ROW({ name, price, stock, id })
      );
      targetTableRow.remove();
      Snackbar.dispatch('상품이 정상적으로 수정되었습니다.');
    } catch ({ message }) {
      Snackbar.dispatch(message, 'fail');
    }
  };

  #handleProductUpdateCancel = (target) => {
    const targetTableRow = target.closest('tr');
    const { productId: id } = target.dataset;

    const product = this.#vendingMachine.productList[id];
    const { name, price, stock } = product;

    targetTableRow.insertAdjacentHTML(
      'afterend',
      TEMPLATE.PRODUCT_TABLE_ROW({ name, price, stock, id })
    );
    targetTableRow.remove();
  };
}
