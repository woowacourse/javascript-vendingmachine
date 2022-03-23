export type ItemInfo = {
  name: string;
  price: number;
  stockCount: number;
};

export class Item {
  name: string;

  price: number;

  stockCount: number;

  constructor(item: ItemInfo) {
    this.name = item.name;
    this.price = item.price;
    this.stockCount = item.stockCount;
  }

  update(itme: ItemInfo): void {}
}
