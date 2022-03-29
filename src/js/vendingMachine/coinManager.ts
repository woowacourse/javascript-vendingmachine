import { CoinsType } from '../types/types';
import { COINS } from '../constants/vendingMachineConstants';
import { generateRandom } from '../utils/common';

export default class CoinManager {
  private _coins: CoinsType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
  private _money = 0;

  get coins(): CoinsType {
    return this._coins;
  }

  get money(): number {
    return this._money;
  }

  chargeCoin(inputMoney: number) {
    this._coins = this.generateRandomCoins(inputMoney);
    this._money += inputMoney;
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
