import { CoinsType } from '../types/types';
import { COINS } from '../constants/vendingMachineConstants';
import { generateRandom } from '../utils/common';

export default class CoinManager {
  private _coins: CoinsType = { fiveHundred: 0, hundred: 0, fifty: 0, ten: 0 };
  private _money = 0;

  get coins() {
    return this._coins;
  }

  get money() {
    return this._money;
  }

  chargeCoin(inputMoney: number) {
    this.addRandomCoins(inputMoney);
    this._money += inputMoney;
  }

  private addRandomCoins(money: number) {
    let restMoney = money;

    Object.keys(this.coins).forEach(key => {
      if (key === 'ten') {
        this.coins[key] += restMoney / COINS[key];
        return;
      }
      const randomNumber = generateRandom(Math.floor(restMoney / COINS[key]));
      restMoney -= randomNumber * COINS[key];
      this.coins[key] += randomNumber;
    });
  }
}
