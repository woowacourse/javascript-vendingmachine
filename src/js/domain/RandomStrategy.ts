import { distributeStrategy } from './interface';
import { pickNumberInRange } from '../utils';
import { MONEY_NAME_STRING } from '../constants';
import { Coin } from './types';

function getRandomCoin(moneyLeft: number, value: number): number {
  const maxCount = Math.floor(moneyLeft / value);

  return pickNumberInRange(0, maxCount);
}

const RandomStrategy: distributeStrategy = {
  distribute(inputMoney: number): Coin[] {
    const coinStatusList: Coin[] = [
      { name: MONEY_NAME_STRING.COIN_500_WON, value: 500, count: 0 },
      { name: MONEY_NAME_STRING.COIN_100_WON, value: 100, count: 0 },
      { name: MONEY_NAME_STRING.COIN_50_WON, value: 50, count: 0 },
      { name: MONEY_NAME_STRING.COIN_10_WON, value: 10, count: 0 },
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
