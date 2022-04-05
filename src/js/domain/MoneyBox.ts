import { CoinStatus, distributeStrategy } from './interface';
import RandomStrategy from './RandomStrategy';
import Coin from './Coin';

export default class MoneyBox {
  #coinStatusList: Coin[];
  #coinDistributeStrategy: distributeStrategy;

  constructor() {
    this.#coinStatusList = [
      new Coin('FIVE_HUNDRED_WON', 500),
      new Coin('ONE_HUNDRED_WON', 100),
      new Coin('FIFTY_WON', 50),
      new Coin('TEN_WON', 10),
    ];

    this.#coinDistributeStrategy = RandomStrategy;
  }

  set strategy(strategy) {
    this.#coinDistributeStrategy = strategy;
  }

  get totalChange() {
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

  addChange(money: number): void {
    const newCoins = this.#coinDistributeStrategy.distribute(money);

    this.#coinStatusList.forEach((coin, index) => {
      coin.added(newCoins[index].count);
    });
  }

  giveChange(money: number): CoinStatus {
    let inputMoney = money;
    return this.#coinStatusList.reduce(
      (totalStatus, { name, value, count }, idx) => {
        totalStatus[name] = Math.min(Math.floor(inputMoney / value), count);
        inputMoney -= totalStatus[name] * value;
        this.#coinStatusList[idx].consumed(totalStatus[name]);
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
}
