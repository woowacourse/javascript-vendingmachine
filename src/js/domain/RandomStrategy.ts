import { Coin, distributeStrategy } from './interface';

import { pickNumberInRange } from '../utils';
import { COIN_500, COIN_100, COIN_50, COIN_10 } from '../constants';

function getRandomCoin(moneyLeft: number, value: number): number {
  const maxCount = Math.floor(moneyLeft / value);

  return pickNumberInRange(0, maxCount);
}

const RandomStrategy: distributeStrategy = {
  // eslint-disable-next-line max-lines-per-function
  distribute(inputMoney: number): Coin[] {
    const coinStatusList: Coin[] = [
      { name: COIN_500.NAME, value: COIN_500.VALUE, count: 0 },
      { name: COIN_100.NAME, value: COIN_100.VALUE, count: 0 },
      { name: COIN_50.NAME, value: COIN_50.VALUE, count: 0 },
      { name: COIN_10.NAME, value: COIN_10.VALUE, count: 0 },
    ];

    let moneyLeft = inputMoney;

    coinStatusList.forEach((coin) => {
      if (coin.name === 'TEN_WON') {
        coin.count = moneyLeft / coin.value;
        return;
      }
      const randomCount = getRandomCoin(moneyLeft, coin.value);
      moneyLeft -= coin.value * randomCount;
      coin.count = randomCount;
    });

    return coinStatusList;
  },
};

export default RandomStrategy;
