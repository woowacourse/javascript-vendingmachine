import { CoinsType } from '../types/types';
import { COINS, INITIAL_COINS } from '../constants/vendingMachineConstants';
import { generateRandom } from '../utils/common';

export default class CoinManager {
  private _coins: CoinsType = this.getInitialCoins();

  get initialCoins() {
    return this.getInitialCoins();
  }

  get coins() {
    return this._coins;
  }

  get coinsSum() {
    return this.getSumCoins(this._coins);
  }

  chargeCoins(money: number) {
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

  exchangeCoins(money: number) {
    let restMoney = money;

    return Object.fromEntries(
      Object.keys(this._coins).map(coinName => {
        const requiredCount = Math.floor(restMoney / COINS[coinName]);
        const remainCount = this._coins[coinName];
        const exchangeCount = requiredCount > remainCount ? remainCount : requiredCount;

        this._coins[coinName] -= exchangeCount;
        restMoney -= COINS[coinName] * exchangeCount;

        return [coinName, exchangeCount];
      })
    );
  }

  getSumCoins(coins: CoinsType) {
    const initialAmount = 0;

    return Object.keys(coins).reduce(
      (account, current) => account + COINS[current] * coins[current],
      initialAmount
    );
  }

  private getInitialCoins() {
    return JSON.parse(JSON.stringify(INITIAL_COINS));
  }
}
