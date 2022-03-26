import PurchaseItemView from '../views/purchaseItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CoinsType } from '../types/types';
import { $ } from '../utils/common';

export default class PurchaseItemController {
  private vendingMachine: VendingMachine;
  private purchaseItemView: PurchaseItemView;
  private coins: CoinsType;
  private inputMoney: number;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.purchaseItemView = new PurchaseItemView();

    this.coins = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
    this.inputMoney = 0;
  }

  bindEvent() {
    $('.submit-button').addEventListener('click', event => event.preventDefault());
  }

  loadPage() {
    const items = this.vendingMachine.getItems();
    this.purchaseItemView.render(items, this.coins, this.inputMoney);

    this.bindEvent();
  }
}
