import { CoinCollection, Coin } from '../../index.d';
import { generateRandomInRange } from '../util';

export default class CoinCollectionImpl implements CoinCollection {
  public readonly coins: Array<Coin>;

  constructor() {
    this.coins = [
      { amount: 10, count: 0 },
      { amount: 50, count: 0 },
      { amount: 100, count: 0 },
      { amount: 500, count: 0 },
    ];
  }

  generateCoins(inputMoney: number): void {
    while (inputMoney > 0) {
      const pickLength = this.coins.filter(({ amount }) => inputMoney >= amount).length - 1;
      const coinIndex = generateRandomInRange(0, pickLength);

      this.coins[coinIndex].count += 1;
      inputMoney -= this.coins[coinIndex].amount;
    }
  }

  calculateTotalAmount(): number {
    return this.coins.reduce((acc, { amount, count }) => acc + amount * count, 0);
  }
}
