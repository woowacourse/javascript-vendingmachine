import Subject from '../core/Subject';
import { Item } from './Item';
import { deepClone } from '../utils/commons';

interface Keyable {
  [key: string]: any;
}

interface State {
  items: Array<Item>;
  coins: Keyable;
}

export default class VendingMachine {
  currentObserver: object;

  state: State;

  constructor(initItems: any, initCoins: any) {
    this.init(initItems, initCoins);
  }

  init(initItems: Array<Item>, initCoins: Keyable): void {
    this.state = Subject.observable({
      items: initItems,
      coins: initCoins,
    });
  }

  useStore(callback: Function): Keyable {
    return deepClone(callback(this.state));
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

    this.state.items = [...this.state.items, newItem];
  }

  updateItem(name: string, updatedItem: Item): void {
    if (!this.findItem(name)) throw new Error('error');

    if (name !== updatedItem.name && this.findItem(updatedItem.name))
      throw new Error('error');

    this.state.items = this.state.items.map((item) =>
      item.name === name ? updatedItem : item
    );
  }

  removeItem(name: string): void {
    if (!this.findItem(name)) throw new Error('error');

    this.state.items = this.state.items.filter((item) => item.name !== name);
  }

  findItem(name: string): Item | null {
    return this.state.items.filter((item) => item.name === name)[0] || null;
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

    Object.keys(this.state.coins).forEach((key) => {
      this.state.coins[key] += randomCoins[key];
    });
  }

  getTotalMoney(): number {
    return Object.entries(this.state.coins).reduce(
      (sum: number, [key, value]) => sum + Number(key) * Number(value),
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
