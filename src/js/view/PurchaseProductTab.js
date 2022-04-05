import { createMainElement, selectDom } from '../utils/dom';
import { productPurcaseTableRow, purchaseTemplate } from './template';

export default class PurchaseProductTab {
  #machine;
  #purchaseContainer;
  #inputMoneyForm;
  #addProductNameInput;
  #totalMoneySpan;
  #productStatusTable;
  #giveChangeButton;
  #coinStatusTable;

  constructor(vendingMachine) {
    this.#machine = vendingMachine;
    this.#purchaseContainer = createMainElement(purchaseTemplate);
    this.#inputMoneyForm = selectDom('.input-money-form', this.#purchaseContainer);
    this.#addProductNameInput = selectDom('#money-input', this.#inputMoneyForm);
    this.#totalMoneySpan = selectDom('#total-money', this.#purchaseContainer);
    this.#productStatusTable = selectDom(
      '#product-status-table',
      this.#purchaseContainer
    );
    this.#giveChangeButton = selectDom('#give-change-button', this.#purchaseContainer);
    this.#coinStatusTable = selectDom('#coin-status-table', this.#purchaseContainer);
    this.#renderTotalMoney();
    this.#renderProductList();

    this.#inputMoneyForm.addEventListener('submit', this.#handleInputMoneyForm);
    this.#productStatusTable.addEventListener('click', this.#handlePurchase);
    this.#giveChangeButton.addEventListener('click', this.#handleGiveChange);
  }

  #renderProductList() {
    Object.entries(this.#machine.productList).forEach(([id, { name, price, stock }]) => {
      this.#productStatusTable.insertAdjacentHTML(
        'beforeend',
        productPurcaseTableRow({ id, name, price, stock })
      );
    });
  }

  #renderTotalMoney() {
    this.#totalMoneySpan.textContent = this.#machine.totalMoney;
  }

  #handleInputMoneyForm = (e) => {
    e.preventDefault();
    try {
      this.#machine.insertMoney(this.#addProductNameInput.valueAsNumber);
    } catch (error) {
      alert(error.message);
      return;
    }
    this.#renderTotalMoney();
    this.#clearInput();
  };

  #clearInput() {
    this.#addProductNameInput.value = '';
  }

  #handlePurchase = (e) => {
    if (!e.target.classList.contains('purchase-product-button')) {
      return;
    }
    const { productId } = e.target.dataset;
    try {
      this.#machine.sellProduct(productId);
    } catch (err) {
      alert(err.message);
      return;
    }
    selectDom('.product-stock', e.target.closest('tr')).textContent =
      this.#machine.productList[productId].stock;
    this.#renderTotalMoney();
  };

  #handleGiveChange = () => {
    const coinStatus = this.#machine.giveChange();
    const coinCountElements =
      this.#coinStatusTable.querySelectorAll('td[data-coin-name]');
    coinCountElements.forEach((element) => {
      element.textContent = `${coinStatus[element.dataset.coinName]}개`;
    });
    this.#renderTotalMoney();
  };

  get element() {
    return this.#purchaseContainer;
  }
}
