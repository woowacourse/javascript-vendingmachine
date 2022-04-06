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
    this._items = items.map(item => {
      const { name, price, quantity, id } = item;
      return new Item(name, price, quantity, id);
    });
  }

  addItem({ name, price, quantity, id }: ItemType) {
    this._items.push(new Item(name, price, quantity, id));
  }

  changeItem(index: number, { name, price, quantity, id }: ItemType) {
    this._items[index] = new Item(name, price, quantity, id);
  }

  deleteItem(targetItem: ItemType) {
    this._items = this._items.filter(item => item.name !== targetItem.name);
  }

  purchaseItem(itemName: string) {
    const targetItem = this._items.find(item => item.name === itemName);
    targetItem.subtractQuantity();
  }
}
