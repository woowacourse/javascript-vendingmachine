import Subject from '../core/Subject';
import { deepClone } from '../utils/commons';
import { createRandomCoins } from '../utils/coinUtils';
import {
  validate,
  itemValidator,
  amountValidator,
  updatedItemValidator,
  removedItemValidator,
} from '../utils/validator';

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

  constructor(items: Item[], coins: Coins) {
    this.state = Subject.observable({ items, coins });
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
    validate(itemValidator, updatedItem);
    validate(updatedItemValidator, this, name, updatedItem);

    this.state.items = this.state.items.map((item) =>
      item.name === name ? updatedItem : item
    );
  }

  removeItem(name: string): void {
    validate(removedItemValidator, this);

    this.state.items = this.state.items.filter((item) => item.name !== name);
  }

  findItem(name: string): Item | null {
    return this.state.items.find((item) => item.name === name) || null;
  }

  addCoin(amount: number): void {
    validate(amountValidator, amount, this.getTotalMoney());

    const randomCoins = createRandomCoins(amount);
    const updatedCoins = Object.keys(this.state.coins).reduce(
      (next: Coins, key) => ({
        ...next,
        [key]: this.state.coins[key] + randomCoins[key],
      }),
      {
        10: 0,
        50: 0,
        100: 0,
        500: 0,
      }
    );

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
