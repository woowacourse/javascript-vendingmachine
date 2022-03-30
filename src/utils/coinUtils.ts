import { COIN } from '../configs/constants';
import { Coins } from '../domains/VendingMachine';
import { deepClone } from './commons';

const getRandomCoin = (): number => {
  const coinValueList = COIN.VALUES;
  const randomIndex = Math.floor(Math.random() * 4);

  return coinValueList[randomIndex];
};

export const createRandomCoins = (amount: number): Coins => {
  const coins = deepClone(COIN.EMPTY_COINS);
  let sum = 0;

  while (sum !== amount) {
    const randomCoin = getRandomCoin();

    if (sum + randomCoin <= amount) {
      sum += randomCoin;

      coins[randomCoin] += 1;
    }
  }

  return coins;
};
