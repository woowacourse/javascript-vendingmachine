import { distributeStrategy } from './interface';
import { pickNumberInRange } from '../utils';
import Coin from './Coin';

function getRandomCoin(moneyLeft: number, value: number): number {
  const maxCount = Math.floor(moneyLeft / value);

  return pickNumberInRange(0, maxCount);
}

const RandomStrategy: distributeStrategy = {
  // eslint-disable-next-line max-lines-per-function
  distribute(inputMoney: number): Coin[] {
    const coinStatusList: Coin[] = [
      new Coin('FIVE_HUNDRED_WON', 500),
      new Coin('ONE_HUNDRED_WON', 100),
      new Coin('FIFTY_WON', 50),
      new Coin('TEN_WON', 10),
    ];
    let moneyLeft = inputMoney;
    coinStatusList.forEach((coin) => {
      if (coin.name === 'TEN_WON') {
        coin.added(moneyLeft / coin.value);
        return;
      }
      const randomCount = getRandomCoin(moneyLeft, coin.value);

      moneyLeft -= coin.value * randomCount;
      coin.added(randomCount);
    });

    return coinStatusList;
  },
};

export default RandomStrategy;
