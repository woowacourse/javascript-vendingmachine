import ItemService from './ItemService';
import CoinService from './CoinService';

export default class VendingMachine {
  constructor() {
    this.itemService = new ItemService();
    this.coinService = new CoinService();
  }

  addItem(newItem: ItemInfo): void {}

  updateItem(name: string): void {}

  deleteItem(name: string): void {}

  addMoney(amount: number): void {}

  getTotalMoney(): number {
    return undefined;
  }
}
