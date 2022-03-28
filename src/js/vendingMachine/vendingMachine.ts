import { COINS } from '../constants/constants';
import { generateRandom } from '../utils/common';
import { ItemType, CoinsType } from '../types/types';

export default class VendingMachine {
  private _items: ItemType[] = [];
  private _coins: CoinsType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
  private _inputMoney = 0;

  get items(): Array<ItemType> {
    return this._items;
  }

  get coins(): CoinsType {
    return this._coins;
  }

  get inputMoney(): number {
    return this._inputMoney;
  }

  addItem({ name, price, quantity }: ItemType) {
    this._items = [...this._items, { name, price, quantity }];
  }

  changeItem(index: number, { name, price, quantity }: ItemType) {
    this._items[index] = { name, price, quantity };
  }

  deleteItem(targetItem: ItemType) {
    this._items = this._items.filter(item => item.name !== targetItem.name);
  }

  chargeMoney(money: number) {
    this._coins = this.generateRandomCoins(money);
    this._inputMoney += money;
  }

  private generateRandomCoins(money: number): CoinsType {
    const newCoins = this._coins;
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
}
