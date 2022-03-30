import { Coin, CoinStatus, distributeStrategy } from './interface';
import RandomStrategy from './RandomStrategy';

export default class MoneyBox {
  #coinStatusList: Coin[];
  #coinDistributeStrategy: distributeStrategy;

  constructor() {
    this.#coinStatusList = [
      { name: 'FIVE_HUNDRED_WON', value: 500, count: 0 },
      { name: 'ONE_HUNDRED_WON', value: 100, count: 0 },
      { name: 'FIFTY_WON', value: 50, count: 0 },
      { name: 'TEN_WON', value: 10, count: 0 },
    ];

    this.#coinDistributeStrategy = RandomStrategy;
  }

  set strategy(strategy) {
    this.#coinDistributeStrategy = strategy;
  }

  get totalChange(): number {
    return this.#coinStatusList.reduce(
      (totalAmount, { value, count }) => totalAmount + value * count,
      0
    );
  }

  get coinStatus(): CoinStatus {
    return this.#coinStatusList.reduce(
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
    return this.#coinStatusList;
  }

  addChange(inputMoney: number): void {
    const newCoins = this.#coinDistributeStrategy.distribute(inputMoney);

    this.#coinStatusList = this.#coinStatusList.map((coin, index) => {
      const addedCoin = { ...coin };
      addedCoin.count += newCoins[index].count;
      return addedCoin;
    });
  }
}
