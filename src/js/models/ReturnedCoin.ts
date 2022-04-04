import { Coins } from './types';
export default class ReturnedCoinModel {
  #returnedCoin: Coins;

  constructor() {
    this.#returnedCoin = {
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    };
  }

  getReturnedCoin() {
    return this.#returnedCoin;
  }
}
