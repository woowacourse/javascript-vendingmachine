import { COIN_TYPE } from '../../constants';
import { getRandomIndex } from '../../utils';
import { Coins, CoinUnionType } from '../types';
import { validateCash } from './validator';

export default class CoinManagementDomain {
  #totalCash: number;
  #coins: Coins;

  constructor() {
    this.#totalCash = 0;
    this.#coins = {};
    COIN_TYPE.forEach(type => {
      this.#coins[type] = 0;
    });
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

  private addCoins(cash: number) {
    while (cash > 0) {
      const randomIndex = getRandomIndex<CoinUnionType>(COIN_TYPE);
      const type = COIN_TYPE[randomIndex];

      if (type > cash) continue;

      this.#coins[type] += 1;
      cash -= type;
    }
  }

  subCoins(coins: Coins) {
    let totalCash = 0;

    Object.keys(this.#coins).forEach(type => {
      this.#coins[type] -= coins[type];
      totalCash += coins[type] * Number(type);
    });

    this.addCash(-totalCash);
  }
}
