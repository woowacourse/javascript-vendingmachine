import { listenEvents } from '../utils/event';

export default class Controller {
  #vendingMachine;

  // eslint-disable-next-line max-lines-per-function
  constructor(vendingMachine, addChangeView, manageProductView, purchaseProductView) {
    this.#vendingMachine = vendingMachine;
    this.addChangePage = addChangeView.main;
    this.manageProductView = manageProductView.main;
    this.purchaseProductView = purchaseProductView.main;

    this.manageProductView.renderInitProductList(this.#vendingMachine.productList);
    this.purchaseProductView.renderInitProductList(this.#vendingMachine.productList);

    listenEvents(this.manageProductView.element, [
      { type: 'addProduct', cb: this.#addProduct },
      { type: 'updateProduct', cb: this.#updateProduct },
      { type: 'removeProduct', cb: this.#removeProduct },
    ]);
    listenEvents(this.addChangePage.element, [
      { type: 'addChange', cb: this.#addChange },
    ]);
    listenEvents(this.purchaseProductView.element, [
      { type: 'inputMoney', cb: this.#inputMoney },
      { type: 'purchaseProduct', cb: this.#purchaseProduct },
      { type: 'giveChange', cb: this.#giveChange },
    ]);
  }

  #addChange = (e) => {
    this.#vendingMachine.addChange(e.detail.money);

    this.addChangePage.renderCoinStatus(
      this.#vendingMachine.coinStatus,
      this.#vendingMachine.totalChange
    );
    this.addChangePage.resetInput();
  };

  #addProduct = (e) => {
    const id = this.#vendingMachine.addProduct(e.detail);
    const { name, price, stock } = this.#vendingMachine.productList[id];
    this.manageProductView.addProduct({ id, name, price, stock });
    this.purchaseProductView.addProduct({ id, name, price, stock });
  };

  #updateProduct = (e) => {
    const { id } = e.detail;
    this.#vendingMachine.updateProduct(id, { ...e.detail });
    this.manageProductView.renderUpdateProduct(id, this.#vendingMachine.productList[id]);
    this.purchaseProductView.renderUpdateProduct(
      id,
      this.#vendingMachine.productList[id]
    );
  };

  #removeProduct = (e) => {
    const { id } = e.detail;
    this.#vendingMachine.removeProduct(id);
    this.manageProductView.removeProduct(id);
    this.purchaseProductView.removeProduct(id);
  };

  #inputMoney = (e) => {
    const { money } = e.detail;
    this.#vendingMachine.insertMoney(money);
    this.purchaseProductView.renderTotalMoney(this.#vendingMachine.totalMoney);
  };

  #purchaseProduct = (e) => {
    const { productId } = e.detail;
    this.#vendingMachine.sellProduct(productId);
    this.manageProductView.renderUpdateProduct(
      productId,
      this.#vendingMachine.productList[productId]
    );
    this.purchaseProductView.renderUpdateProduct(
      productId,
      this.#vendingMachine.productList[productId]
    );
    this.purchaseProductView.renderTotalMoney(this.#vendingMachine.totalMoney);
  };

  #giveChange = () => {
    const coinStatus = this.#vendingMachine.giveChange();
    this.purchaseProductView.renderChange(coinStatus);
    this.purchaseProductView.renderTotalMoney(this.#vendingMachine.totalMoney);
    this.addChangePage.renderCoinStatus(
      this.#vendingMachine.coinStatus,
      this.#vendingMachine.totalChange
    );
  };
}
