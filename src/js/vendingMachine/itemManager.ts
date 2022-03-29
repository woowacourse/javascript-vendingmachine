import { ItemType } from '../types/types';

export default class ItemManager {
  private _items: ItemType[] = [];

  get items() {
    return this._items;
  }

  addItem({ name, price, quantity }: ItemType) {
    this._items = [...this._items, { name, price, quantity }];
  }

  changeItem(index: number, { name, price, quantity }: ItemType) {
    this._items[index] = { name, price, quantity };
  }

  deleteItem(targetItem: ItemType) {
    this._items = this._items.filter(item => item.name !== targetItem.name);
  }
}
