import PurchaseItemView from '../views/purchaseItemView';
import VendingMachine from '../vendingMachine/vendingMachine';
import { CoinsType } from '../types/types';

export default class PurchaseItemController {
  vendingMachine: VendingMachine;
  purchaseItemView: PurchaseItemView;
  coins: CoinsType;
  inputMoney: number;

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine;
    this.purchaseItemView = new PurchaseItemView(vendingMachine);
  }

  render() {
    this.purchaseItemView.render();
  }
}
