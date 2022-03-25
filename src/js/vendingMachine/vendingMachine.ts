import { COINS } from '../constants/constants';
import { generateRandom } from '../utils/common';
import { ItemType, CoinsType } from '../types/types';

export default class VendingMachine {
  private items: ItemType[] = [];
  private coins: CoinsType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
  private inputMoney = 0;

  getItems(): Array<ItemType> {
    return JSON.parse(JSON.stringify(this.items));
  }

  setItems(newItems: ItemType[]) {
    this.items = newItems;
  }

  getCoins(): CoinsType {
    return { ...this.coins };
  }

  setCoins(newCoins: CoinsType) {
    this.coins = newCoins;
  }

  getInputMoney(): number {
    return this.inputMoney;
  }

  setInputMoney(inputMoney: number) {
    this.inputMoney = inputMoney;
  }

  getTotalMoney(coins: CoinsType): number {
    let totalMoney = 0;
    Object.keys(coins).forEach(coinKey => {
      totalMoney += coins[coinKey] * COINS[coinKey];
    });
    return totalMoney;
  }

  addItem({ name, price, quantity }: ItemType) {
    const newItems = [...this.items, { name, price, quantity }];
    this.setItems(newItems);
  }

  deleteItem(targetItem: ItemType) {
    const newItems = this.getItems().filter(item => item.name !== targetItem.name);
    this.setItems(newItems);
  }

  changeItem(index: number, { name, price, quantity }: ItemType) {
    const newItems = this.getItems();
    newItems[index] = { name, price, quantity };
    this.setItems(newItems);
  }

  generateRandomCoins(money: number): CoinsType {
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
    const newMoney = this.getInputMoney() + money;
    this.setCoins(newCoins);
    this.setInputMoney(newMoney);
  }
}
