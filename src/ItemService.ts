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
    if (this.itemList.get(newItem.name).stockCount + newItem.stockCount > 20) {
      throw Error('error');
    }

    this.itemList.set(newItem.name, new Item(newItem));
  }

  update(name: string): void {}

  delete(name: string): void {}

  find(name: string): ItemInfo {
    return;
  }
}
