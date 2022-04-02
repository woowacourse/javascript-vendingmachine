import PurchaseItemView from '../views/purchaseItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CoinsType, MoneyDetailType } from '../types';
import { onCustomEvent } from '../utils/common';
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

    this.bindEvents();
  }

  bindEvents() {
    onCustomEvent('PURCHASE_MONEY_INPUT', this.handlePurchaseMoneyInput.bind(this));
  }

  handlePurchaseMoneyInput(event: CustomEvent) {
    const { inputMoney }: MoneyDetailType = event.detail;

    this.vendingMachine.chargePurchaseInputMoney(inputMoney);
  }

  loadPage() {
    const items = this.vendingMachine.getItems();
    const inputMoney = this.vendingMachine.getPurchaseInputMoney();

    this.purchaseItemView.render(items, this.coins, inputMoney);
  }
}
