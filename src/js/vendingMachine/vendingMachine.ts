import { ItemType, CoinsType } from '../types/types';
import CoinManager from './coinManager';
import ItemManager from './itemManager';

export default class VendingMachine {
  private itemManager: ItemManager = new ItemManager();
  private coinManager: CoinManager = new CoinManager();

  get items(): Array<ItemType> {
    return this.itemManager.items;
  }

  get coins(): CoinsType {
    return this.coinManager.coins;
  }

  get money(): number {
    return this.coinManager.money;
  }

  addItem(item: ItemType) {
    this.itemManager.addItem(item);
  }

  changeItem(index: number, item: ItemType) {
    this.itemManager.changeItem(index, item);
  }

  deleteItem(targetItem: ItemType) {
    this.itemManager.deleteItem(targetItem);
  }

  chargeMoney(inputMoney: number) {
    this.coinManager.chargeCoin(inputMoney);
  }
}
