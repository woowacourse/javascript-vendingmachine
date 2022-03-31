import { coinType } from '../../constants';
import { Coins } from '../types';
import { validatePurchaseCash } from './validator';

export default class PurchaseCashDomain {
  #cash;

  constructor() {
    this.#cash = 0;
  }

  get cash() {
    return this.#cash;
  }

  addCash(cash: number) {
    this.#cash += cash;
  }

  validateCashInput(cash: number) {
    validatePurchaseCash(cash);
  }

  returnCoins(haveCoins: Coins): Coins {
    const coins: Coins = {};

    coinType.forEach(type => {
      const count = Math.min(Math.floor(this.#cash / type), haveCoins[type]);
      coins[type] = count;
      this.addCash(-(count * type));
    });

    return coins;
  }
}
