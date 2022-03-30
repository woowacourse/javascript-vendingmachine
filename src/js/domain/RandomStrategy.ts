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

    return coinStatusList.map((coin) => {
      const coinObj = { ...coin };
      if (coinObj.name === 'TEN_WON') {
        coinObj.count = moneyLeft / coinObj.value;
        return coinObj;
      }
      const randomCount = getRandomCoin(moneyLeft, coinObj.value);
      moneyLeft -= coinObj.value * randomCount;
      coinObj.count = randomCount;
      return coinObj;
    });
  },
};

export default RandomStrategy;
