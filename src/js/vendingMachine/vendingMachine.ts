import { ItemType } from '../types/types';
import CoinManager from './coinManager';
import ItemManager from './itemManager';
import {
  checkDuplicatedItem,
  validateAddItemInput,
  validateChargeMoney,
} from '../validates/validates';

export default class VendingMachine {
  private itemManager = new ItemManager();
  private coinManager = new CoinManager();

  get items() {
    return this.itemManager.items;
  }

  get coins() {
    return this.coinManager.coins;
  }

  get coinsSum() {
    return this.coinManager.coinsSum;
  }

  addItem(item: ItemType) {
    const { items } = this.itemManager;

    validateAddItemInput(item);
    checkDuplicatedItem(items, item, null);

    this.itemManager.addItem(item);
  }

  changeItem(index: number, item: ItemType) {
    const { items } = this.itemManager;

    validateAddItemInput(item);
    checkDuplicatedItem(items, item, index);

    this.itemManager.changeItem(index, item);
  }

  deleteItem(targetItem: ItemType) {
    this.itemManager.deleteItem(targetItem);
  }

  chargeMoney(inputMoney: number) {
    validateChargeMoney(inputMoney);
    this.coinManager.chargeCoin(inputMoney);
  }
}
