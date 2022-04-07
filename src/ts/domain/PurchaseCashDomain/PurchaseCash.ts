import { COIN_TYPE } from '../../constants';
import { Coins } from '../types';

export default class PurchaseCashDomain {
  #cash: number;

  constructor() {
    this.#cash = 0;
  }

  get cash() {
    return this.#cash;
  }

  addCash(cash: number) {
    this.#cash += cash;
  }

  returnCoins(haveCoins: Coins): Coins {
    const coins: Coins = {};

    // 500~10까지 차례대로 최대 개수를 반환
    COIN_TYPE.forEach(type => {
      const maxAmount = Math.min(
        Math.floor(this.#cash / type),
        haveCoins[type],
      );
      coins[type] = maxAmount;
      this.addCash(-(maxAmount * type));
    });

    return coins;
  }
}
