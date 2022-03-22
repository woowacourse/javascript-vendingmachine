import { ItemInfo, Item } from './Item';

export default class ItemService {
  itemList: Map<string, Item>;

  constructor(initItemList: Array<ItemInfo>) {
    this.init(initItemList);
  }

  init(initItemList: Array<ItemInfo>) {
    this.itemList = initItemList.reduce(
      (itemList: Map<string, Item>, item) =>
        itemList.set(item.name, new Item(item)),
      new Map()
    );
  }

  add(newItem: ItemInfo): void {
    if (
      (this.itemList.has(newItem.name)
        ? this.itemList.get(newItem.name).stockCount + newItem.stockCount
        : newItem.stockCount) > 20
    )
      throw new Error('error');

    if (newItem.price % 10 !== 0) throw new Error('error');

    if (newItem.name.length > 10 || newItem.name.trim().length === 0)
      throw new Error('error');

    if (newItem.price < 100 || newItem.price > 10000) throw new Error('error');

    this.itemList.set(newItem.name, new Item(newItem));
  }

  update(name: string, newValue: ItemInfo): void {
    if (!this.itemList.has(name)) throw new Error('error');

    if (name !== newValue.name && this.itemList.has(newValue.name))
      throw new Error('error');

    this.itemList.set(name, new Item(newValue));
  }

  delete(name: string): void {
    if (!this.itemList.has(name)) throw new Error('error');

    this.itemList.delete(name);
  }

  find(name: string): ItemInfo | null {
    return this.itemList.get(name) || null;
  }
}
