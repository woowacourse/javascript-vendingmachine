import pickRandomElement from '../utils';

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
