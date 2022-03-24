import PurchaseItemView from '../views/purchaseItem/purchaseItemView';
import { COINS } from '../constants/constant';

export default class PurchaseItemController {
  vendingMachine: any;
  purchaseItemView: any;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.purchaseItemView = new PurchaseItemView();
  }

  render() {
    const items = this.vendingMachine.getItems();
    const coins = this.vendingMachine.getCoins();
    const inputMoney = this.vendingMachine.getInputMoney();
    this.purchaseItemView.render(items, coins, inputMoney);
  }
}
