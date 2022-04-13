import { ItemType } from '../types/types';
import Item from './item';

export default class ItemManager {
  private _items: ItemType[] = [];

  get items() {
    return this._items;
  }

  getItemWithName(name: string) {
    return this._items.find(item => item.name === name);
  }

  setItems(items: ItemType[]) {
    this._items = items.map(item => new Item(item));
  }

  addItem(item: ItemType) {
    this._items.push(new Item(item));
  }

  changeItem(index: number, item: ItemType) {
    this._items[index] = new Item(item);
  }

  deleteItem(targetItem: ItemType) {
    this._items = this._items.filter(item => item.name !== targetItem.name);
  }

  purchaseItem(itemName: string) {
    const targetItem = this._items.find(item => item.name === itemName);
    targetItem.subtractQuantity();
  }
}
