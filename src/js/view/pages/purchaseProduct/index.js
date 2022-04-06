import { createMainElement, selectDom } from '../../../utils/dom';
import { emitEvent } from '../../../utils/event';
import { productPurchaseTableRow, purchaseTemplate } from './template';

export default class PurchaseProductTab {
  #purchaseContainer;
  #inputMoneyForm;
  #addProductNameInput;
  #totalMoneySpan;
  #productStatusTable;
  #giveChangeButton;
  #coinStatusTable;

  constructor() {
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

    this.#inputMoneyForm.addEventListener('submit', this.#handleInputMoneyForm);
    this.#productStatusTable.addEventListener('click', this.#handlePurchase);
    this.#giveChangeButton.addEventListener('click', this.#handleGiveChange);
  }

  addProduct({ id, name, price, stock }) {
    this.#productStatusTable.insertAdjacentHTML(
      'beforeend',
      productPurchaseTableRow({ id, name, price, stock })
    );
  }

  renderInitProductList(productList) {
    Object.entries(productList).forEach(([id, { name, price, stock }]) => {
      this.addProduct({ id, name, price, stock });
    });
  }

  renderTotalMoney(money) {
    this.#totalMoneySpan.textContent = money;
  }

  #handleInputMoneyForm = (e) => {
    e.preventDefault();
    const money = this.#addProductNameInput.valueAsNumber;
    emitEvent(this.element, 'inputMoney', { money });

    this.#clearInput();
  };

  #clearInput() {
    this.#addProductNameInput.value = '';
  }

  renderUpdateProduct(id, { name, price, stock }) {
    const targetTableRow = selectDom(
      `[data-product-id='${id}']`,
      this.#productStatusTable
    ).closest('tr');
    targetTableRow.insertAdjacentHTML(
      'afterend',
      productPurchaseTableRow({ name, price, stock, id })
    );
    targetTableRow.remove();
  }

  #handlePurchase = (e) => {
    if (!e.target.classList.contains('purchase-product-button')) {
      return;
    }
    const { productId } = e.target.dataset;
    emitEvent(this.element, 'purchaseProduct', { productId });
  };

  #handleGiveChange = () => {
    emitEvent(this.element, 'giveChange', {});
  };

  renderChange(coinStatus) {
    const coinCountElements =
      this.#coinStatusTable.querySelectorAll('td[data-coin-name]');
    coinCountElements.forEach((element) => {
      element.textContent = `${coinStatus[element.dataset.coinName]}개`;
    });
  }

  removeProduct(id) {
    selectDom(`[data-product-id='${id}']`, this.#productStatusTable)
      .closest('tr')
      .remove();
  }

  get element() {
    return this.#purchaseContainer;
  }
}
