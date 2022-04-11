import { CoinManager, Coins } from '../types/CoinManager';

import { COINS } from '../constants';
import { checkCanAddMoney } from './validator';

export default class VendingMachineCoinManager implements CoinManager {
  private coins: Coins = { ...COINS.INITIAL_STATE };

  getCoins() {
    return this.coins;
  }

  getTotalAmount() {
    return Object.entries(this.coins).reduce(
      (sum: number, [coin, count]: [string, number]) =>
        sum + Number(coin.replace('COIN_', '')) * count,
      0
    );
  }

  addCoins(newCoins: Coins) {
    checkCanAddMoney(this.getTotalAmount(), newCoins);

    Object.entries(newCoins).forEach(([coin, count]: [string, number]) => {
      this.coins[coin] += count;
    });
  }

  returnCoins(money: number) {
    const coins = [500, 100, 50, 10];
    return coins.reduce(
      (returnedCoins, coin) => {
        while (money >= coin && this.coins[`COIN_${coin}`]) {
          money -= coin;
          returnedCoins[`COIN_${coin}`] += 1;
          this.coins[`COIN_${coin}`] -= 1;
        }

        return returnedCoins;
      },
      { ...COINS.INITIAL_STATE }
    );
  }
}
