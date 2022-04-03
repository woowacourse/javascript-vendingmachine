import PurchaseItemView from '../views/purchaseItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CoinsType, MoneyDetailType } from '../types';
import { onCustomEvent, showSnackBar } from '../utils/common';
import { Controller } from '../types/interface';

export default class PurchaseItemController implements Controller {
  private vendingMachine: VendingMachine;
  private purchaseItemView: PurchaseItemView;
  private coins: CoinsType;
  private inputMoney: number;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.purchaseItemView = new PurchaseItemView();

    this.bindEvents();
  }

  bindEvents() {
    onCustomEvent('PURCHASE_MONEY_INPUT', this.handlePurchaseMoneyInput.bind(this));
    onCustomEvent('RETURN_MONEY', () => {
      try {
        this.vendingMachine.giveChange();
        showSnackBar('잔돈이 반환되었습니다.');
        this.loadPage();
      } catch (error) {
        alert(error.message);
      }
    });
  }

  handlePurchaseMoneyInput(event: CustomEvent) {
    const { inputMoney }: MoneyDetailType = event.detail;

    this.vendingMachine.chargePurchaseInputMoney(inputMoney);
  }

  loadPage() {
    const items = this.vendingMachine.getItems();
    const inputMoney = this.vendingMachine.getPurchaseInputMoney();
    const coins = this.vendingMachine.getChange();

    this.purchaseItemView.render(items, coins, inputMoney);
  }
}
