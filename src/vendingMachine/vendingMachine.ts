import { COINS } from '../constants/constant.js';
import { generateRandom } from '../utils/common.js';

type ItemType = { name: string; price: number; quantity: number };
type CoinType = { ten: number; fifty: number; hundred: number; fiveHundred: number };
export default class VendingMachine {
  private items: ItemType[] = [];
  private coins: CoinType = { ten: 0, fifty: 0, hundred: 0, fiveHundred: 0 };

  constructor() {}

  getItems(): Array<ItemType> {
    return JSON.parse(JSON.stringify(this.items));
  }

  setItems(newItems: ItemType[]) {
    this.items = newItems;
  }

  getCoins(): CoinType {
    return { ...this.coins };
  }

  setCoins(newCoins: CoinType) {
    this.coins = newCoins;
  }

  addItem({ name, price, quantity }: ItemType) {
    const newItems = [...this.items, { name, price, quantity }];
    this.setItems(newItems);
  }

  changeItem(index: number, { name, price, quantity }: ItemType) {
    const newItems = this.getItems();
    newItems[index] = { name, price, quantity };
    this.setItems(newItems);
  }

  generateRandomCoins(money: number) {
    const newCoins = this.getCoins();

    Object.keys(newCoins)
      .reverse()
      .forEach(key => {
        if (key === 'ten') {
          newCoins[key] += money / COINS[key];
          return;
        }
        const randomNumber = generateRandom(Math.floor(money / COINS[key]));
        money = money - randomNumber * COINS[key];
        newCoins[key] += randomNumber;
      });
    return newCoins;
  }

  chargeMoney(money: number) {
    const newCoins = this.generateRandomCoins(money);
    this.setCoins(newCoins);
  }
}
