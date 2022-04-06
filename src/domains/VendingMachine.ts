import Domain from '../core/Domain';
import { createRandomCoins } from '../utils/coinUtils';
import {
  validate,
  itemValidator,
  amountValidator,
  updatedItemValidator,
  removedItemValidator,
  insertMoneyValidator,
  purchaseItemValidator,
  returnChangeValidator,
} from '../utils/validator';
import { COIN } from '../configs/constants';

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
  insertedMoney: number;
  returnedChange: Coins;
}

export default class VendingMachine extends Domain<VendingMachineState> {
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
    validate(removedItemValidator, this.findItem(name));

    this.state.items = this.state.items.filter((item) => item.name !== name);
  }

  purchaseItem(name: string): void {
    const purchasedItem = this.findItem(name);

    validate(purchaseItemValidator, purchasedItem, this.state.insertedMoney);

    this.state.items = this.state.items.map((item) =>
      item.name === name
        ? {
            ...item,
            quantity: item.quantity - 1,
          }
        : item
    );

    this.state.insertedMoney -= purchasedItem.price;

    if (this.findItem(name).quantity <= 0) this.removeItem(name);
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
      COIN.EMPTY_COINS
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

  insertMoney(amount: number): void {
    validate(insertMoneyValidator, amount, this.state.insertedMoney);

    this.state.insertedMoney += amount;
  }

  returnChange(): void {
    validate(returnChangeValidator, this.state.insertedMoney);

    let remain = this.state.insertedMoney;

    const returnedChange = Object.keys(this.state.coins).reduce(
      (next: Coins, key) => {
        const coinValue = Number(key);
        const coinAmount = Math.min(
          Math.floor(remain / coinValue),
          this.state.coins[key]
        );
        remain -= coinAmount * coinValue;

        return { ...next, [key]: coinAmount };
      },
      COIN.EMPTY_COINS
    );

    const updatedCoins = Object.keys(this.state.coins).reduce(
      (next: Coins, key) => ({
        ...next,
        [key]: this.state.coins[key] - returnedChange[key],
      }),
      COIN.EMPTY_COINS
    );

    this.state.insertedMoney = remain;
    this.state.returnedChange = returnedChange;
    this.state.coins = updatedCoins;
  }
}

export const vendingMachine = new VendingMachine({
  items: [],
  coins: COIN.EMPTY_COINS,
  insertedMoney: 0,
  returnedChange: COIN.EMPTY_COINS,
});
