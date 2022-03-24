import { COINS } from '../constants/constant';
import { generateRandom } from '../utils/common';

type ItemType = { name: string; price: number; quantity: number };
type CoinType = { fiveHundred: number; hundred: number; fifty: number; ten: number };

export default class VendingMachine {
  private items: ItemType[] = [];
  private coins: CoinType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };

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

  generateRandomCoins(money: number): CoinType {
    const newCoins = this.getCoins();
    let restMoney = money;

    Object.keys(newCoins).forEach(key => {
      if (key === 'ten') {
        newCoins[key] += restMoney / COINS[key];
        return;
      }
      const randomNumber = generateRandom(Math.floor(restMoney / COINS[key]));
      restMoney -= randomNumber * COINS[key];
      newCoins[key] += randomNumber;
    });
    return newCoins;
  }

  chargeMoney(money: number) {
    const newCoins = this.generateRandomCoins(money);
    this.setCoins(newCoins);
  }
}
