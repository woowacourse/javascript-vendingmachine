import { COINS } from '../constants';
import { pickRandomElement } from '../utils';

interface CoinProperty {
  500: number;
  100: number;
  50: number;
  10: number;
}

class Coin implements CoinProperty {
  500 = 0;
  100 = 0;
  50 = 0;
  10 = 0;

  constructor(...args: number[]) {
    COINS.forEach((coin, i) => (this[coin] = arguments[i]));
  }

  getAmount() {
    return Object.entries(this).reduce((previous, [key, value]) => previous + value * Number(key), 0);
  }

  genarateRandomCoin(amount: number) {
    let remainingAmount = amount;

    while (remainingAmount > 0) {
      const randomCoin = pickRandomElement(COINS);

      if (remainingAmount >= randomCoin) {
        this[randomCoin] += 1;
        remainingAmount -= randomCoin;
      }
    }
  }
}

export default Coin;
