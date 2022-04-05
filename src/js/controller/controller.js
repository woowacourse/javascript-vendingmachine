import { selectDom } from '../utils/dom';
import { listenEvents } from '../utils/event';

export default class Controller {
  #vendingMachine;

  constructor(vendingMachine, addChangeView, manageProductView, purchaseProductVIew) {
    this.#vendingMachine = vendingMachine;
    this.addChangePage = addChangeView.main;
    this.manageProductView = manageProductView.main;
    this.purchaseProductVIew = purchaseProductVIew.main;
    listenEvents(selectDom('body'), [['addChange', this.#addChange]]);
  }

  #addChange = (e) => {
    this.#vendingMachine.addChange(e.detail.money);

    this.addChangePage.renderCoinStatus(
      this.#vendingMachine.coinStatus,
      this.#vendingMachine.totalChange
    );
    this.addChangePage.resetInput();
  };
}
