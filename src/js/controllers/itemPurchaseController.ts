import ItemPurchaseView from '../views/itemPurchaseView';
import { COINS } from '../constants/constant';

export default class MoneyChargeController {
  vendingMachine: any;
  itemPurchaseView: any;

  constructor(vendingMachine) {
    this.vendingMachine = vendingMachine;
    this.itemPurchaseView = new ItemPurchaseView();
  }

  render() {
    const items = this.vendingMachine.getItems();
    const coins = this.vendingMachine.getCoins();
    const inputMoney = this.vendingMachine.getInputMoney();
    this.itemPurchaseView.render(items, coins, inputMoney);
  }
}
