import { Coin, distributeStrategy } from './interface';
import { pickNumberInRange } from '../utils';

function getRandomCoin(moneyLeft: number, value: number): number {
  const maxCount = Math.floor(moneyLeft / value);

  return pickNumberInRange(0, maxCount);
}

const RandomStrategy: distributeStrategy = {
  // eslint-disable-next-line max-lines-per-function
  distribute(inputMoney: number): Coin[] {
    const coinStatusList: Coin[] = [
      { name: 'FIVE_HUNDRED_WON', value: 500, count: 0 },
      { name: 'ONE_HUNDRED_WON', value: 100, count: 0 },
      { name: 'FIFTY_WON', value: 50, count: 0 },
      { name: 'TEN_WON', value: 10, count: 0 },
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
