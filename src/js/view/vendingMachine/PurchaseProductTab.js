import { ERROR, SNACKBAR_MESSAGE } from '../../constants';
import { createMainElement, selectDom } from '../../utils/dom';
import Snackbar from '../SnackBar';
import { TEMPLATE } from '../template';

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

  #renderPurchaseableProductList() {
    let productTableBody = TEMPLATE.PURCHASEABLE_PRODUCT_TABLE_BODY;
    const { productList } = this.#vendingMachine;

    for (let id of Object.keys(productList)) {
      const { name, price, stock } = productList[id];
      const data = { name, price, stock, id };

      productTableBody += TEMPLATE.PURCHASEABLE_PRODUCT_TABLE_ROW(data);
    }

    this.#purchaseableProductStatusTbody.replaceChildren();
    this.#purchaseableProductStatusTbody.insertAdjacentHTML(
      'beforeend',
      productTableBody
    );
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
    Snackbar.dispatch(SNACKBAR_MESSAGE.RETURN_CHAGNE_SUCCESS);
  };

  #handleInsertMoney = (e) => {
    e.preventDefault();
    const money = this.#insertMoneyInput.valueAsNumber;

    try {
      this.#vendingMachine.insertMoney(money);
      this.#totalInsertMoney.textContent = this.#vendingMachine.totalInsertMoney;
      this.#resetInput();
      Snackbar.dispatch(SNACKBAR_MESSAGE.INSERT_MONEY_SUCCESS);
    } catch ({ message }) {
      Snackbar.dispatch(message, ERROR);
    }
  };

  #handlePurchaseProduct = ({ target }) => {
    if (!target.classList.contains('purchase-product-button')) return;

    const parent = target.closest('tr');
    const productId = target.dataset.productId;
    const productStock = selectDom('.product-stock', parent);

    try {
      this.#vendingMachine.purchaseProduct(productId);
      this.#totalInsertMoney.textContent = this.#vendingMachine.totalInsertMoney;
      productStock.textContent = productStock.textContent - 1;
      Snackbar.dispatch(SNACKBAR_MESSAGE.PURCHASE_PRODUCT_SUCCESS);
    } catch ({ message }) {
      Snackbar.dispatch(message, ERROR);
    }
  };

  #resetInput() {
    this.#insertMoneyInput.value = '';
  }
}
