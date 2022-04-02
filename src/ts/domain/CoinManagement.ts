import { coinType } from '../constants';
import { getRandomIndex } from '../utils';
import type { Coins, CoinUnionType } from './types';

export default class CoinManagement {
  #totalCash: number;
  #coins: Coins;

  constructor() {
    this.#totalCash = 0;
    this.#coins = {};
    coinType.forEach(type => (this.#coins[type] = 0));
  }

  get totalCash() {
    return this.#totalCash;
  }

  get coins() {
    return this.#coins;
  }

  addCash(cash: number) {
    this.#totalCash += cash;
    this.addCoins(cash);
  }

  addCoins(cash: number) {
    while (cash > 0) {
      const randomIndex = getRandomIndex<CoinUnionType>(coinType);
      const type = coinType[randomIndex];

      if (type > cash) continue;

      this.#coins[type] += 1;
      cash -= type;
    }
  }

  subtractCoins(returnableCoin) {
    coinType.forEach(type => (this.#coins[type] -= returnableCoin[type]));
    this.#totalCash -= coinType.reduce(
      (acc, current) => acc + returnableCoin[current] * current,
      0,
    );
  }
}
