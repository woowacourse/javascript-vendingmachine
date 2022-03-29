import Subject from '../core/Subject';
import { deepClone } from '../utils/commons';
import { createRandomCoins } from '../utils/coinUtil';
import { validate, itemValidator, amountValidator } from '../utils/validator';
import { ERROR_MESSAGE } from '../constant/constant';

export interface Item {
  name: string;
  price: number;
  quantity: number;
}

export interface Coins {
  10: number;
  50: number;
  100: number;
  500: number;
}

export interface VendingMachineState {
  items: Item[];
  coins: Coins;
}

export default class VendingMachine {
  state: VendingMachineState;

  constructor(initialItems: Item[], initialCoins: Coins) {
    this.init(initialItems, initialCoins);
  }

  init(initialItems: Item[], initialCoins: Coins): void {
    this.state = Subject.observable({
      items: initialItems,
      coins: initialCoins,
    });
  }

  useStore(callback: Function): any {
    return deepClone(callback(this.state));
  }

  addItem(item: Item) {
    const prevItem = this.findItem(item.name);

    if (prevItem) {
      this.updateItem(prevItem.name, {
        ...prevItem,
        quantity: prevItem.quantity + item.quantity,
      });

      return;
    }

    validate(itemValidator, item);

    this.state.items = [...this.state.items, item];
  }

  updateItem(name: string, updatedItem: Item): void {
    if (!this.findItem(name)) throw new Error(ERROR_MESSAGE.NOT_FOUND);

    if (name !== updatedItem.name && this.findItem(updatedItem.name))
      throw new Error(ERROR_MESSAGE.NAME_ALREADY_USED);

    validate(itemValidator, updatedItem);

    this.state.items = this.state.items.map((item) =>
      item.name === name ? updatedItem : item
    );
  }

  removeItem(name: string): void {
    if (!this.findItem(name)) throw new Error(ERROR_MESSAGE.NOT_FOUND);

    this.state.items = this.state.items.filter((item) => item.name !== name);
  }

  findItem(name: string): Item | null {
    return this.state.items.filter((item) => item.name === name)[0] || null;
  }

  addCoin(amount: number): void {
    validate(amountValidator, amount, this.getTotalMoney());

    const randomCoins = createRandomCoins(amount);
    const updatedCoins: Coins = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };

    Object.keys(this.state.coins).forEach((key) => {
      updatedCoins[key] = this.state.coins[key] + randomCoins[key];
    });

    this.state.coins = updatedCoins;
  }

  getTotalMoney(): number {
    return Object.entries(this.state.coins).reduce(
      (sum: number, [key, value]: [string, number]) =>
        sum + Number(key) * value,
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
