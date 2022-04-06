import { selectDom } from '../utils/dom';
import { listenEvents } from '../utils/event';

export default class Controller {
  #vendingMachine;

  constructor(vendingMachine, addChangeView, manageProductView, purchaseProductVIew) {
    this.#vendingMachine = vendingMachine;
    this.addChangePage = addChangeView.main;
    this.manageProductView = manageProductView.main;
    this.purchaseProductVIew = purchaseProductVIew.main;
    listenEvents(this.manageProductView.element, [
      { type: 'addProduct', cb: this.#addProduct },
    ]);
    listenEvents(this.addChangePage.element, [
      { type: 'addChange', cb: this.#addChange },
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
    this.purchaseProductVIew.addProduct({ id, name, price, stock });
  };
}
