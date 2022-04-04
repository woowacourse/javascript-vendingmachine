import { CoinStatus, distributeStrategy } from './interface';
import RandomStrategy from './RandomStrategy';
import { MONEY_NAME_STRING } from '../constants';
import { Coin } from './types';

export default class MoneyBox {
  #coinStatusList: Coin[];
  #coinDistributeStrategy: distributeStrategy;

  constructor() {
    this.#coinStatusList = [
      { name: MONEY_NAME_STRING.COIN_500_WON, value: 500, count: 0 },
      { name: MONEY_NAME_STRING.COIN_100_WON, value: 100, count: 0 },
      { name: MONEY_NAME_STRING.COIN_50_WON, value: 50, count: 0 },
      { name: MONEY_NAME_STRING.COIN_10_WON, value: 10, count: 0 },
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

  addChange(inputMoney: number) {
    const newCoins = this.#coinDistributeStrategy.distribute(inputMoney);

    this.#coinStatusList = this.#coinStatusList.map((coin, index) => {
      const addedCoin = { ...coin };
      addedCoin.count += newCoins[index].count;
      return addedCoin;
    });
  }

  returnChange(inputMoney: number): Coin[] {
    const newCoinStatusList: Coin[] = [...this.#coinStatusList];
    let moneyLeft = inputMoney;

    const returnCoinList: Coin[] = this.#coinStatusList.map((coin, index): Coin => {
      const coinCopy = { ...coin };
      const returnCount = Math.min(Math.floor(moneyLeft / coin.value), coin.count);

      newCoinStatusList[index].count = coin.count - returnCount;
      moneyLeft -= coin.value * returnCount;
      coinCopy.count = returnCount;

      return coinCopy;
    });

    this.#coinStatusList = newCoinStatusList;
    return returnCoinList;
  }
}
