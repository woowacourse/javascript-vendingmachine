import { NOT_ENOUGH_CHANGE_MESSAGE } from '../constants';
import { createMainElement, selectDom } from '../utils/dom';
import { purchaseProductTableRowTemplate, purchaseTabTemplate } from './template';

export default class PurchaseProductTab {
  #vendingMachine;
  #snackbar;
  #purchaseContainer;
  #userMoneyForm;
  #userMoneyInput;
  #totalUserMoney;
  #productStatusTable;
  #returnChangeButton;
  #coinStatusTable;

  constructor(machine, snackbar) {
    this.#vendingMachine = machine;
    this.#snackbar = snackbar;

    this.#purchaseContainer = createMainElement(purchaseTabTemplate);
    this.#userMoneyForm = selectDom('#user-money-form', this.#purchaseContainer);
    this.#userMoneyInput = selectDom('#user-money-input', this.#userMoneyForm);
    this.#totalUserMoney = selectDom('#total-insert', this.#purchaseContainer);
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
    this.#userMoneyForm.addEventListener('submit', this.#handleUserMoney);
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

  #handleUserMoney = (e) => {
    e.preventDefault();

    const userMoney = this.#userMoneyInput.valueAsNumber;

    try {
      this.#vendingMachine.addUserMoney(userMoney);

      this.#totalUserMoney.textContent = this.#vendingMachine.userMoney;
      this.#userMoneyInput.value = '';
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
    this.#totalUserMoney.textContent = this.#vendingMachine.userMoney;
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

      this.#totalUserMoney.textContent = this.#vendingMachine.userMoney;

      if (this.#vendingMachine.userMoney !== 0) {
        this.#snackbar.addToMessageList(NOT_ENOUGH_CHANGE_MESSAGE);
      }
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
