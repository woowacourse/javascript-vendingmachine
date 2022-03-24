import PurchaseItemView from '../views/purchaseItem/purchaseItemView';
import { COINS } from '../constants/constant';

export default class PurchaseItemController {
  vendingMachine: any;
  purchaseItemView: any;
  coins: { fiveHundred: number; hundred: number; fifty: number; ten: number };
  inputMoney: number;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.purchaseItemView = new PurchaseItemView();

    this.coins = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
    this.inputMoney = 0;
  }

  render() {
    const items = this.vendingMachine.getItems();
    this.purchaseItemView.render(items, this.coins, this.inputMoney);
  }
}
