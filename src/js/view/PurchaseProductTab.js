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

    this.#moneyInsertForm.addEventListener('submit', this.#handleMoneyInsert);
    this.#productStatusTable.addEventListener('click', this.#handlePurchase);
    this.#returnChangeButton.addEventListener('click', this.#handleChangeReturn);
    this.#renderInitialProducts();
  }

  get tabElements() {
    this.#renderInitialProducts();
    return this.#purchaseContainer;
  }

  #renderInitialProducts() {
    const { productList } = this.#vendingMachine;
    const productTableRows = [...Object.entries(productList)].reduce(
      (htmlString, [id, { name, price, stock }]) =>
        `${htmlString}${purchaseProductTableRowTemplate({ name, price, stock, id })}`,
      ''
    );
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
    const stock = selectDom('.product-stock', targetTableRow);

    const { productId: id } = target.dataset;

    try {
      this.#vendingMachine.purchaseProduct(id);
      this.#totalMoneyInsert.textContent = this.#vendingMachine.moneyInsert;

      const updatedProduct = this.#vendingMachine.productList[id];
      if (!updatedProduct) {
        targetTableRow.remove();
        return;
      }
      stock.textContent = updatedProduct.stock;
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };

  #handleChangeReturn = () => {
    try {
      const returnCoins = this.#vendingMachine.returnChange();

      returnCoins.forEach(({ name, count }) => {
        selectDom(
          `td[data-coin-name="${name}"]`,
          this.#coinStatusTable
        ).textContent = `${count}개`;
      });

      this.#totalMoneyInsert.textContent = this.#vendingMachine.moneyInsert;
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
