import Subject from '../core/Subject';
import { deepClone } from '../utils/commons';
import { createRandomCoins } from '../utils/coinUtil';
import { validate, itemValidator, amountValidator } from '../utils/validator';
import { ERROR_MESSAGE, EMPTY_COIN } from '../constant/constant';

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
  purchaseMoney: number;
}
export default class VendingMachine {
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
    return this.state.items.find((item) => item.name === name);
  }

  addCoin(amount: number): void {
    validate(amountValidator, amount, this.getTotalMoney());

    const randomCoins = createRandomCoins(amount);
    const updatedCoins: Coins = EMPTY_COIN;

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

  addPurchaseMoney(money: number): void {
    if (money % 10 !== 0) throw new Error('10으로 나눠 떨어져야함');
    if (money > 10000 || money <= 0) throw new Error('범위 밖 값');

    this.state.purchaseMoney += money;
  }

  buyItem(nameId: string): void {
    if (!this.findItem(nameId)) throw new Error(ERROR_MESSAGE.NOT_FOUND);

    const { name, price, quantity } = this.findItem(nameId);
    if (price > this.state.purchaseMoney)
      throw new Error('상품을 구매할 수 없습니다. 금액을 충전해주세요.');

    this.state.purchaseMoney -= price;
    this.updateItem(name, { name, price, quantity: quantity - 1 });
  }

  returnChange(): Coins {
    const coinArray = [...Object.entries(this.state.coins)].sort(
      ([a], [b]) => +b - +a
    );

    let index = coinArray.length;
    const result = deepClone(EMPTY_COIN);

    while (this.state.purchaseMoney > 0 && index >= 0) {
      const [coinType, count] = coinArray[index];
      if (count > 0) {
        result[coinType] += 1;
        this.state.purchaseMoney -= +coinType;
        this.state.coins[coinType] -= 1;
      } else {
        index -= 1;
      }
    }

    return result;
  }
}

export const vendingMachine = new VendingMachine([], EMPTY_COIN, 0);
