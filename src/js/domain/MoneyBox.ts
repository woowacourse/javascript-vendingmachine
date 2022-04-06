import { Coin, CoinStatus, distributeStrategy } from './interface';

import RandomStrategy from './RandomStrategy';

import { COIN_500, COIN_100, COIN_50, COIN_10 } from '../constants';
import { deepCopy, deepCopyList } from '../utils';

export default class MoneyBox {
  #coinStatusList: Coin[];
  #returnCoinStatusList: Coin[];
  #coinDistributeStrategy: distributeStrategy;

  constructor() {
    this.#coinStatusList = [
      { name: COIN_500.NAME, value: COIN_500.VALUE, count: 0 },
      { name: COIN_100.NAME, value: COIN_100.VALUE, count: 0 },
      { name: COIN_50.NAME, value: COIN_50.VALUE, count: 0 },
      { name: COIN_10.NAME, value: COIN_10.VALUE, count: 0 },
    ];

    this.#returnCoinStatusList = [
      { name: COIN_500.NAME, value: COIN_500.VALUE, count: 0 },
      { name: COIN_100.NAME, value: COIN_100.VALUE, count: 0 },
      { name: COIN_50.NAME, value: COIN_50.VALUE, count: 0 },
      { name: COIN_10.NAME, value: COIN_10.VALUE, count: 0 },
    ];

    this.#coinDistributeStrategy = RandomStrategy;
  }

  set strategy(strategy) {
    this.#coinDistributeStrategy = strategy;
  }

  get totalChange(): number {
    const totalChange = this.#coinStatusList.reduce(
      (totalAmount, { value, count }) => totalAmount + value * count,
      0
    );
    return totalChange;
  }

  //추후 리팩토링 필요!
  get coinStatus(): CoinStatus {
    const totalStatus: CoinStatus = {};

    this.#coinStatusList.forEach(({ name, count }) => {
      totalStatus[name] = count;
    });

    return totalStatus;
  }

  get returnCoinStatus(): CoinStatus {
    const totalStatus: CoinStatus = {};

    this.#returnCoinStatusList.forEach(({ name, count }) => {
      totalStatus[name] = count;
    });

    return totalStatus;
  }

  addChange(inputMoney: number): void {
    const distributedCoinStatusList = this.#coinDistributeStrategy.distribute(inputMoney);

    this.#coinStatusList = this.#coinStatusList.map((coin, index) => {
      const cloneCoinObject = deepCopy(coin);

      cloneCoinObject.count += distributedCoinStatusList[index].count;
      return cloneCoinObject;
    });
  }

  //TODO: 리팩토링 필수
  returnChange(totalInsertMoney): number {
    const returnCoinStatusList = deepCopyList(this.#returnCoinStatusList);
    const coinStatusList = deepCopyList(this.#coinStatusList);
    let leftMoney = totalInsertMoney;

    coinStatusList.forEach(({ value, count }, index) => {
      const quotient = Math.floor(leftMoney / value);
      const number = quotient > count ? count : quotient;

      returnCoinStatusList[index].count = number;
      if (number === 0) return;

      leftMoney -= number * value;
      coinStatusList[index].count -= number;
    });

    this.#coinStatusList = coinStatusList;
    this.#returnCoinStatusList = returnCoinStatusList;

    return totalInsertMoney - leftMoney;
  }
}
