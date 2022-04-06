import { createMainElement, selectDom } from '../utils/dom';
import { TEMPLATE } from './template';

export default class PurchaseProductTab {
  #vendingMachine;
  #purchaseContainer;
  #insertMoneyForm;
  #insertMoneyInput;
  #totalInsertMoney;
  #purchaseableProductStatusTbody;
  #returnChangeButton;
  #returnCoinStatusTable;

  constructor(machine) {
    //멤버변수 생성
    this.#vendingMachine = machine;

    this.#purchaseContainer = createMainElement(TEMPLATE.PURCHASE);
    this.#insertMoneyForm = selectDom('#insert-money-form', this.#purchaseContainer);
    this.#insertMoneyInput = selectDom('#insert-money-input', this.#purchaseContainer);
    this.#totalInsertMoney = selectDom('#total-insert-money', this.#purchaseContainer);
    this.#purchaseableProductStatusTbody = selectDom(
      '#purchaseable-product-status-tbody',
      this.#purchaseContainer
    );
    this.#returnChangeButton = selectDom(
      '#return-change-button',
      this.#purchaseContainer
    );

    this.#returnCoinStatusTable = selectDom(
      '#return-coin-status-table',
      this.#purchaseContainer
    );

    //이벤트 바인딩
    this.#insertMoneyForm.addEventListener('submit', this.#handleInsertMoney);
    this.#purchaseableProductStatusTbody.addEventListener(
      'click',
      this.#handlePurchaseProduct
    );
    this.#returnChangeButton.addEventListener('click', this.#handleReturnChange);
  }

  get tabElements() {
    this.#renderPurchaseableProductList();
    return this.#purchaseContainer;
  }

  #handleReturnChange = () => {
    this.#vendingMachine.returnChange();

    const { returnCoinStatus } = this.#vendingMachine;
    const coinCountElements =
      this.#returnCoinStatusTable.querySelectorAll('td[data-coin-name]');

    coinCountElements.forEach((element) => {
      element.textContent = `${returnCoinStatus[element.dataset.coinName]}개`;
    });

    this.#totalInsertMoney.textContent = this.#vendingMachine.totalInsertMoney;
  };

  #renderPurchaseableProductList() {
    const { productList } = this.#vendingMachine;
    let productTableBody = TEMPLATE.PURCHASEABLE_PRODUCT_TABLE_BODY;

    for (let id of Object.keys(productList)) {
      const { name, price, stock } = productList[id];

      productTableBody += TEMPLATE.PURCHASEABLE_PRODUCT_TABLE_ROW({
        name,
        price,
        stock,
        id,
      });
    }

    this.#purchaseableProductStatusTbody.replaceChildren();
    this.#purchaseableProductStatusTbody.insertAdjacentHTML(
      'beforeend',
      productTableBody
    );
  }

  #handleInsertMoney = (e) => {
    e.preventDefault();
    const money = this.#insertMoneyInput.valueAsNumber;

    try {
      this.#vendingMachine.insertMoney(money);
      this.#totalInsertMoney.textContent = this.#vendingMachine.totalInsertMoney;
      this.#resetInput();
    } catch ({ message }) {
      alert(message);
    }
  };

  #handlePurchaseProduct = ({ target }) => {
    if (!target.classList.contains('purchase-product-button')) return;

    const parent = target.closest('tr');
    const productId = target.dataset.productId;

    try {
      this.#vendingMachine.purchaseProduct(productId);
      this.#totalInsertMoney.textContent = this.#vendingMachine.totalInsertMoney;
      const stock = selectDom('.product-stock', parent);
      stock.textContent = stock.textContent - 1;
    } catch ({ message }) {
      alert(message);
    }
  };

  #resetInput() {
    this.#insertMoneyInput.value = '';
  }
}
