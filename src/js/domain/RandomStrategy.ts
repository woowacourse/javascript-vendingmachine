import { Coin, distributeStrategy } from './interface';
import { pickNumberInRange } from '../utils';

function getRandomCoin(moneyLeft: number, value: number): number {
  const maxCount = Math.floor(moneyLeft / value);

  return pickNumberInRange(0, maxCount);
}

const RandomStrategy: distributeStrategy = {
  distribute(inputMoney: number): Coin[] {
    const coinStatusList: Coin[] = [
      { name: 'FIVE_HUNDRED_WON', value: 500, count: 0 },
      { name: 'ONE_HUNDRED_WON', value: 100, count: 0 },
      { name: 'FIFTY_WON', value: 50, count: 0 },
      { name: 'TEN_WON', value: 10, count: 0 },
    ];
    let moneyLeft = inputMoney;

    return coinStatusList.map((coin) => {
      const coinObject = { ...coin };
      if (coinObject.name === 'TEN_WON') {
        coinObject.count = moneyLeft / coin.value;
        return coinObject;
      }
      const randomCount = getRandomCoin(moneyLeft, coin.value);
      moneyLeft -= coin.value * randomCount;
      coinObject.count = randomCount;
      return coinObject;
    });
  },
};

export default RandomStrategy;
