import PurchaseItemView from '../views/purchaseItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CoinsType } from '../types';
import { $ } from '../utils/common';
import { Controller } from '../types/interface';

export default class PurchaseItemController implements Controller {
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

  bindEvents() {
    $('.submit-button').addEventListener('click', event => event.preventDefault());
  }

  loadPage() {
    const items = this.vendingMachine.getItems();
    this.purchaseItemView.render(items, this.coins, this.inputMoney);

    this.bindEvents();
  }
}
