import { coinType, MESSAGE } from '../constants';
import { showSnackbar } from '../utils';
import type { Coins, CoinUnionType } from './types';

export default class MoneyManagement {
  #money = 0;
  #returnedCoins: Coins = coinType.reduce((object, type) => {
    object[type] = 0;
    return object;
  }, {});

  get money() {
    return this.#money;
  }

  get returnedCoins() {
    return this.#returnedCoins;
  }

  addMoney(money) {
    this.#money += money;
  }

  subtractMoney(money) {
    this.#money -= money;
  }

  returnCoins(coins: Coins): Coins {
    const returnableCoins: Coins = coinType.reduce((object, type) => {
      object[type] = 0;
      return object;
    }, {});

    coinType.forEach(type => {
      const returnableCoin = this.#calculateReturnableCoin(coins, type);
      if (!returnableCoin) return;

      this.#returnedCoins[type] += returnableCoin;
      returnableCoins[type] += returnableCoin;
      this.#money -= returnableCoin * type;
    });

    if (this.#money > 0) showSnackbar(MESSAGE.NOT_ENOUGH_COINS);

    return returnableCoins;
  }

  #calculateReturnableCoin(coins: Coins, type: CoinUnionType): number {
    if (coins[type] >= Math.floor(this.#money / type)) {
      return Math.floor(this.#money / type);
    }
    return coins[type];
  }
}
