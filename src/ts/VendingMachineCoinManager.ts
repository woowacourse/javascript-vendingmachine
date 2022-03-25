import { checkCanAddMoney } from './utils/utils';

export interface coins {
  coin500: number;
  coin100: number;
  coin50: number;
  coin10: number;
}

interface CoinManager {
  getCoins(): coins;
  getTotalAmount(): number;
  addCoins(newCoins: coins): void;
}

export default class VendingMachineCoinManager implements CoinManager {
  private coins: coins = {
    coin500: 0,
    coin100: 0,
    coin50: 0,
    coin10: 0,
  };

  getCoins() {
    return this.coins;
  }

  getTotalAmount() {
    return Object.entries(this.coins).reduce(
      (sum: number, [coin, count]: [string, number]) =>
        sum + Number(coin.replace('coin', '')) * count,
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
