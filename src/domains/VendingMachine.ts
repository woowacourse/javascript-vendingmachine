import { Item } from './Item';

export default class VendingMachine {
  items: Map<string, Item>;

  coins: object;

  constructor(initItems: any, initCoins: any) {
    this.init(initItems, initCoins);
  }

  init(initItems: any, initCoins: any) {
    this.items = initItems.reduce(
      (items: Map<string, Item>, item: Item) => items.set(item.name, item),
      new Map()
    );
    this.coins = { ...initCoins };
  }

  getState() {
    return {
      items: new Map(this.items),
      coinList: { ...this.coins },
    };
  }

  addItem(item: Item) {
    const prevItem = this.findItem(item.name);

    if ((prevItem ? prevItem.quantity + item.quantity : item.quantity) > 20)
      throw new Error('error');

    if (item.price % 10 !== 0) throw new Error('error');

    if (item.name.length > 10 || item.name.trim().length === 0)
      throw new Error('error');

    if (item.price < 100 || item.price > 10000) throw new Error('error');

    const newItem = prevItem
      ? {
          ...prevItem,
          ...{ price: item.price, quantity: prevItem.quantity + item.quantity },
        }
      : item;

    this.items.set(item.name, newItem);
  }

  updateItem(name: string, updatedItem: Item): void {
    if (!this.findItem(name)) throw new Error('error');

    if (name !== updatedItem.name && this.findItem(updatedItem.name))
      throw new Error('error');

    this.items.set(name, updatedItem);
  }

  deleteItem(name: string): void {
    if (!this.findItem(name)) throw new Error('error');

    this.items.delete(name);
  }

  findItem(name: string): Item | null {
    return this.items.get(name) || null;
  }

  createRandomCoins(amount: number): any {
    const coinValueList = [10, 50, 100, 500];
    const coins: object = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    let sum = 0;

    while (sum !== amount) {
      const randomIndex = Math.floor(Math.random() * 4);
      const randomCoin = coinValueList[randomIndex];

      if (sum + randomCoin <= amount) {
        sum += randomCoin;

        coins[randomCoin] += 1;
      }
    }

    return coins;
  }

  addCoin(amount: number): void {
    if (amount < 10 || amount > 100000) throw new Error('error');
    if (amount % 10 !== 0) throw new Error('error');
    if (this.getTotalMoney() + amount > 100000) throw new Error('error');

    const randomCoins = this.createRandomCoins(amount);

    Object.keys(this.coins).forEach((key) => {
      this.coins[key] += randomCoins[key];
    });
  }

  getTotalMoney(): number {
    return Object.entries(this.coins).reduce(
      (sum: number, [key, value]) => sum + Number(key) * value,
      0
    );
  }
}

export const vendingMachine = new VendingMachine([], {
  10: 0,
  50: 0,
  100: 0,
  500: 0,
});
