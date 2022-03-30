import { CoinManager, Coins } from '../types/vendingMachineCoinManager';

import { COINS } from '../constants';
import { checkCanAddMoney } from '../utils/utils';

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
}
