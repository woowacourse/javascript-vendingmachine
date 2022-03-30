import { Coin, CoinStatus, distributeStrategy } from './interface';

import RandomStrategy from './RandomStrategy';

import { COIN_500, COIN_100, COIN_50, COIN_10 } from '../constants';

export default class MoneyBox {
  private _coinStatusList: Coin[];
  private coinDistributeStrategy: distributeStrategy;

  constructor() {
    this._coinStatusList = [
      { name: COIN_500.NAME, value: COIN_500.VALUE, count: 0 },
      { name: COIN_100.NAME, value: COIN_100.VALUE, count: 0 },
      { name: COIN_50.NAME, value: COIN_50.VALUE, count: 0 },
      { name: COIN_10.NAME, value: COIN_10.VALUE, count: 0 },
    ];

    this.coinDistributeStrategy = RandomStrategy;
  }

  set strategy(strategy) {
    this.coinDistributeStrategy = strategy;
  }

  get totalChange(): number {
    return this._coinStatusList.reduce(
      (totalAmount, { value, count }) => totalAmount + value * count,
      0
    );
  }

  get coinStatus(): CoinStatus {
    const totalStatus: CoinStatus = {};

    this._coinStatusList.forEach(({ name, count }) => {
      totalStatus[name] = count;
    });

    return totalStatus;
  }

  get coinStatusList(): Coin[] {
    return this._coinStatusList;
  }

  addChange(inputMoney: number): void {
    const newCoins = this.coinDistributeStrategy.distribute(inputMoney);

    this._coinStatusList.forEach((coin, index) => {
      coin.count += newCoins[index].count;
    });
  }
}
