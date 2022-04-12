import { COINS } from '../constants';
import { pickRandomElement } from '../utils';

class Coin {
  500: number = 0;
  100: number = 0;
  50: number = 0;
  10: number = 0;

  constructor(...args: number[]) {
    COINS.forEach((coin, i) => (this[coin] = arguments[i]));
  }

  getAmount() {
    return Object.entries(this).reduce((previous, [key, value]) => previous + value * Number(key), 0);
  }

  generateRandomCoin(amount: number) {
    let remainingAmount = amount;

    while (remainingAmount > 0) {
      const randomCoin = pickRandomElement(COINS);

      if (remainingAmount >= randomCoin) {
        this[randomCoin] += 1;
        remainingAmount -= randomCoin;
      }
    }
  }

  subtractCoin(value, count) {
    this[value] -= count;
  }
}

export default Coin;
