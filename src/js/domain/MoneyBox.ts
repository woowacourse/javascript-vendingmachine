import RandomStrategy from './RandomStrategy';

interface Coin {
  name: string;
  value: number;
  count: number;
}

interface CoinCounts {
  FIVE_HUNDRED_WON: number;
  ONE_HUNDRED_WON: number;
  FIFTY_WON: number;
  TEN_WON: number;
}

interface distributeStrategy {
  distribute(inputMoney: number): Coin[];
}

export default class MoneyBox {
  private _coinStatusList: Coin[];

  private coinDistributeStrategy: distributeStrategy;

  constructor() {
    this._coinStatusList = [
      { name: 'FIVE_HUNDRED_WON', value: 500, count: 0 },
      { name: 'ONE_HUNDRED_WON', value: 100, count: 0 },
      { name: 'FIFTY_WON', value: 50, count: 0 },
      { name: 'TEN_WON', value: 10, count: 0 },
    ];

    this.coinDistributeStrategy = RandomStrategy;
  }

  set strategy(strategy) {
    this.coinDistributeStrategy = strategy;
  }

  get totalAmount(): number {
    return this._coinStatusList.reduce(
      (totalAmount, { value, count }) => totalAmount + value * count,
      0
    );
  }

  get coinStatus(): CoinCounts {
    return this._coinStatusList.reduce(
      (totalStatus, { name, count }) => {
        totalStatus[name] = count;
        return totalStatus;
      },
      {
        FIVE_HUNDRED_WON: 0,
        ONE_HUNDRED_WON: 0,
        FIFTY_WON: 0,
        TEN_WON: 0,
      }
    );
  }

  get coinStatusList(): Coin[] {
    return this._coinStatusList;
  }

  charge(inputMoney: number): void {
    const newCoins = this.coinDistributeStrategy.distribute(inputMoney);

    this._coinStatusList.forEach((coin, index) => {
      coin.count += newCoins[index].count;
    });
  }
}
