import { pickRandomElement } from '../utils';

interface ICoin {
  '500': number;
  '100': number;
  '50': number;
  '10': number;
}

class Coin implements ICoin {
  '500': number = 0;
  '100': number = 0;
  '50': number = 0;
  '10': number = 0;

  constructor(quantity500 = 0, quantity100 = 0, quantity50 = 0, quantity10 = 0) {
    this[500] = quantity500;
    this[100] = quantity100;
    this[50] = quantity50;
    this[10] = quantity10;
  }

  getAmount() {
    return Object.entries(this).reduce((previous, [key, value]) => previous + value * Number(key), 0);
  }

  randomGenarate(amount: number) {
    const coins = [500, 100, 50, 10];
    let remainingAmount = amount;

    while (remainingAmount > 0) {
      const randomCoin: number = pickRandomElement(coins);

      if (remainingAmount >= randomCoin) {
        this[randomCoin] += 1;
        remainingAmount -= randomCoin;
      }
    }
  }
}

export default Coin;
