import Subject from '../core/Subject';
import { deepClone } from '../utils/commons';
import { createRandomCoins, sortCoins } from '../utils/coinUtil';
import { getData, setData } from '../utils/storageUtil';
import { validate, itemValidator, amountValidator } from '../utils/validator';
import { ERROR_MESSAGE, EMPTY_COIN, LOCALSTORAGE_KEY } from '../constant';

export interface Item {
  name: string;
  price: number;
  quantity: number;
}

export interface Coins {
  500: number;
  100: number;
  50: number;
  10: number;
}

export interface VendingMachineState {
  items: Item[];
  coins: Coins;
  purchaseMoney: number;
}

class VendingMachine {
  state: VendingMachineState;

  constructor(initialItems: Item[], initialCoins: Coins, initialMoney: number) {
    this.state = Subject.observable({
      items: initialItems,
      coins: initialCoins,
      purchaseMoney: initialMoney,
    });
  }

  useStore(callback: Function): any {
    return deepClone(callback(this.state));
  }

  addItem(item: Item) {
    const prevItem = this.findItem(item.name);

    if (prevItem) {
      this.updateItem(prevItem.name, {
        ...item,
        quantity: item.quantity + prevItem.quantity,
      });

      return;
    }

    validate(itemValidator, item);

    this.state.items = [...this.state.items, item];
    setData(LOCALSTORAGE_KEY.ITEM, this.state.items);
  }

  updateItem(name: string, updatedItem: Item): void {
    if (!this.findItem(name)) throw new Error(ERROR_MESSAGE.NOT_FOUND);

    if (name !== updatedItem.name && this.findItem(updatedItem.name))
      throw new Error(ERROR_MESSAGE.NAME_ALREADY_USED);

    validate(itemValidator, updatedItem);

    this.state.items = this.state.items.map((item) =>
      item.name === name ? updatedItem : item
    );
    setData(LOCALSTORAGE_KEY.ITEM, this.state.items);
  }

  removeItem(name: string): void {
    if (!this.findItem(name)) throw new Error(ERROR_MESSAGE.NOT_FOUND);

    this.state.items = this.state.items.filter((item) => item.name !== name);
    setData(LOCALSTORAGE_KEY.ITEM, this.state.items);
  }

  findItem(name: string): Item | null {
    return this.state.items.find((item) => item.name === name);
  }

  addCoin(amount: number): void {
    validate(amountValidator, amount, this.getTotalMoney());

    const randomCoins: Coins = createRandomCoins(amount);
    const updatedCoins: Coins = { ...EMPTY_COIN };

    Object.keys(this.state.coins).forEach((key) => {
      updatedCoins[key] = this.state.coins[key] + randomCoins[key];
    });

    this.state.coins = updatedCoins;
    setData(LOCALSTORAGE_KEY.COIN, this.state.coins);
  }

  getTotalMoney(): number {
    return Object.entries(this.state.coins).reduce(
      (sum: number, [key, value]: [string, number]) =>
        sum + Number(key) * value,
      0
    );
  }

  addPurchaseMoney(money: number): void {
    if (money % 10 !== 0) throw new Error(ERROR_MESSAGE.WRONG_AMOUNT_UNIT);
    if (money > 10000 || money <= 0)
      throw new Error(ERROR_MESSAGE.WRONG_AMOUNT_RANGE);

    this.state.purchaseMoney += money;
  }

  buyItem(nameId: string): void {
    if (!this.findItem(nameId)) throw new Error(ERROR_MESSAGE.NOT_FOUND);

    const { name, price, quantity } = this.findItem(nameId);
    if (price > this.state.purchaseMoney)
      throw new Error(ERROR_MESSAGE.CANNOT_BUY);

    this.state.purchaseMoney -= price;
    if (quantity === 1) {
      this.removeItem(name);

      return;
    }
    this.updateItem(name, { name, price, quantity: quantity - 1 });
  }

  returnChange(): Coins {
    let index = 0;
    const result = { ...EMPTY_COIN };

    if (this.state.purchaseMoney === 0) {
      throw new Error(ERROR_MESSAGE.NO_PURCHASE_MONEY);
    }

    while (
      this.state.purchaseMoney > 0 &&
      index < Object.keys(this.state.coins).length
    ) {
      const coinArray = sortCoins(this.state.coins);
      const [coinType, count] = coinArray[index];

      if (count > 0 && +coinType <= this.state.purchaseMoney) {
        result[coinType] += 1;
        this.state.purchaseMoney -= +coinType;
        this.state.coins[coinType] -= 1;
      } else {
        index += 1;
      }
    }

    setData(LOCALSTORAGE_KEY.COIN, this.state.coins);

    return result;
  }
}

const initialItems = getData(LOCALSTORAGE_KEY.ITEM) || [];
const initialCoins = getData(LOCALSTORAGE_KEY.COIN) || { ...EMPTY_COIN };

export const vendingMachine = new VendingMachine(initialItems, initialCoins, 0);
