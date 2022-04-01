import { COINS } from '../constants';
import { pickRandomElement } from '../utils';

export type CoinType = 500 | 100 | 50 | 10;

export interface CoinCounter {
  type: '500won' | '100won' | '50won' | '10won';
  count: number;
}

interface CoinProperty {
  counter: Record<CoinType, CoinCounter>;
}

export class Coin implements CoinProperty {
  counter: Record<CoinType, CoinCounter> = {
    500: { type: '500won', count: 0 },
    100: { type: '100won', count: 0 },
    50: { type: '50won', count: 0 },
    10: { type: '10won', count: 0 },
  };

  constructor(counter: Record<CoinType, CoinCounter>) {
    this.counter = counter;
  }

  getAmount() {
    return Object.entries(this.counter).reduce((previous, [key, value]) => previous + value.count * Number(key), 0);
  }

  genarateRandomCoin(amount: number) {
    let remainingAmount = amount;

    while (remainingAmount > 0) {
      const randomCoin = pickRandomElement(COINS);

      if (remainingAmount >= randomCoin) {
        this.counter[randomCoin].count += 1;
        remainingAmount -= randomCoin;
      }
    }
  }
}
