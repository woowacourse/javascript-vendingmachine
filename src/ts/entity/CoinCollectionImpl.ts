import { CoinCollection, Coin } from '../../index.d';

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
    
  }

  calculateTotalAmount(): number {
    return this.coins.reduce((acc, { amount, count }) => acc + amount * count, 0);
  }
}
