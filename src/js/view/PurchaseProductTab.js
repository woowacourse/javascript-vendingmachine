import { NOT_ENOUGH_CHANGE_MESSAGE } from '../constants';
import { createMainElement, selectDom } from '../utils/dom';
import { purchaseProductTableRowTemplate, purchaseTabTemplate } from './template';

export default class PurchaseProductTab {
  #vendingMachine;
  #snackbar;
  #purchaseContainer;
  #moneyInsertForm;
  #moneyInsertInput;
  #totalMoneyInsert;
  #productStatusTable;
  #returnChangeButton;
  #coinStatusTable;

  constructor(machine, snackbar) {
    this.#vendingMachine = machine;
    this.#snackbar = snackbar;

    this.#purchaseContainer = createMainElement(purchaseTabTemplate);
    this.#moneyInsertForm = selectDom('#money-insert-form', this.#purchaseContainer);
    this.#moneyInsertInput = selectDom('#money-insert-input', this.#moneyInsertForm);
    this.#totalMoneyInsert = selectDom('#total-insert', this.#purchaseContainer);
    this.#productStatusTable = selectDom(
      '.product-status-table',
      this.#purchaseContainer
    );
    this.#returnChangeButton = selectDom(
      '#return-change-button',
      this.#purchaseContainer
    );
    this.#coinStatusTable = selectDom('.coin-status-table', this.#purchaseContainer);

    this.#attachEventListeners();
    this.#renderInitialProducts();
  }

  get tabElements() {
    this.#renderInitialProducts();
    return this.#purchaseContainer;
  }

  #attachEventListeners() {
    this.#moneyInsertForm.addEventListener('submit', this.#handleMoneyInsert);
    this.#productStatusTable.addEventListener('click', this.#handlePurchase);
    this.#returnChangeButton.addEventListener('click', this.#handleChangeReturn);
  }

  #renderInitialProducts() {
    const { productList } = this.#vendingMachine;
    const productTableRows = [...Object.entries(productList)].reduce(
      (htmlString, [id, { name, price, stock }]) =>
        `${htmlString}${purchaseProductTableRowTemplate({ name, price, stock, id })}`,
      ''
    );

    this.#purchaseContainer
      .querySelectorAll('.product-table-row')
      .forEach((element) => element.remove());
    this.#productStatusTable.insertAdjacentHTML('beforeend', productTableRows);
  }

  #handleMoneyInsert = (e) => {
    e.preventDefault();

    const moneyInsert = this.#moneyInsertInput.valueAsNumber;

    try {
      this.#vendingMachine.addMoneyInsert(moneyInsert);

      this.#totalMoneyInsert.textContent = this.#vendingMachine.moneyInsert;
      this.#moneyInsertInput.value = '';
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };

  #handlePurchase = ({ target }) => {
    if (!target.classList.contains('purchase-product-button')) return;

    const targetTableRow = target.closest('tr');

    const { productId: id } = target.dataset;

    try {
      this.#vendingMachine.purchaseProduct(id);
      this.#renderProductPurchase(id, targetTableRow);
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };

  #renderProductPurchase(id, tableRow) {
    this.#totalMoneyInsert.textContent = this.#vendingMachine.moneyInsert;
    const stockTableData = selectDom('.product-stock', tableRow);
    const updatedProduct = this.#vendingMachine.productList[id];
    if (!updatedProduct) {
      tableRow.remove();
      return;
    }
    stockTableData.textContent = updatedProduct.stock;
  }

  #handleChangeReturn = () => {
    try {
      const returnCoins = this.#vendingMachine.returnChange();

      returnCoins.forEach(({ name, count }) => {
        const coinTableData = selectDom(
          `td[data-coin-name="${name}"]`,
          this.#coinStatusTable
        );
        coinTableData.textContent = `${count}개`;
      });

      this.#totalMoneyInsert.textContent = this.#vendingMachine.moneyInsert;

      if (this.#vendingMachine.moneyInsert !== '0') {
        this.#snackbar.addToMessageList(NOT_ENOUGH_CHANGE_MESSAGE);
      }
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
