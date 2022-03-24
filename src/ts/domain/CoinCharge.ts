import { coinType } from '../constants';
import { getRandomIndex } from '../utils';

interface CoinCharge {
  addCash: (cash: number) => void;
  addCoins: (cash: number) => void;
}

export default class CoinChargeDomain implements CoinCharge {
  #totalCash;
  #coins;

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

  addCash(cash) {
    this.#totalCash += cash;
  }

  addCoins(cash) {
    while (cash > 0) {
      const randomIndex = getRandomIndex(coinType);
      const type = coinType[randomIndex];

      if (type > cash) continue;

      this.#coins[type] += 1;
      cash -= type;
    }
  }
}
