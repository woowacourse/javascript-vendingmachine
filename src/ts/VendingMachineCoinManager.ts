import { CoinManager, coins } from './types/vendingMachineCoinManager';

import { COINS_INITIAL_STATE } from './constants';
import { checkCanAddMoney } from './utils/utils';

export default class VendingMachineCoinManager implements CoinManager {
  private coins: coins = { ...COINS_INITIAL_STATE };

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

  addCoins(newCoins: coins) {
    checkCanAddMoney(this.getTotalAmount(), newCoins);

    Object.entries(newCoins).forEach(([coin, count]: [string, number]) => {
      this.coins[coin] += count;
    });
  }
}
