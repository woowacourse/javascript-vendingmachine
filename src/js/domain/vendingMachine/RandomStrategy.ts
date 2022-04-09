import { Coin, distributeStrategy } from '../interface';

import { pickNumberInRange, deepCopy } from '../../utils';
import { COIN_500, COIN_100, COIN_50, COIN_10 } from '../../constants';

function getRandomCoin(moneyLeft: number, value: number): number {
  const maxCount = Math.floor(moneyLeft / value);
  return pickNumberInRange(0, maxCount);
}

const RandomStrategy: distributeStrategy = {
  distribute(inputMoney: number): Coin[] {
    const coinStatusList: Coin[] = [
      { name: COIN_500.NAME, value: COIN_500.VALUE, count: 0 },
      { name: COIN_100.NAME, value: COIN_100.VALUE, count: 0 },
      { name: COIN_50.NAME, value: COIN_50.VALUE, count: 0 },
      { name: COIN_10.NAME, value: COIN_10.VALUE, count: 0 },
    ];

    let moneyLeft = inputMoney;

    const distributedCoinStatusList = coinStatusList.map((coin) => {
      const cloneCoinObject = deepCopy(coin);

      if (cloneCoinObject.name === 'TEN_WON') {
        cloneCoinObject.count = moneyLeft / cloneCoinObject.value;
        return cloneCoinObject;
      }

      const randomCount = getRandomCoin(moneyLeft, cloneCoinObject.value);
      moneyLeft -= cloneCoinObject.value * randomCount;
      cloneCoinObject.count = randomCount;
      return cloneCoinObject;
    });

    return distributedCoinStatusList;
  },
};

export default RandomStrategy;
