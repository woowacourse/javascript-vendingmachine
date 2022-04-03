import { Coins } from '../domains/VendingMachine';
import { COINS, EMPTY_COIN } from '../constant/constant';

const getRandomCoin = (): number => {
  const coinValueList = COINS;
  const randomIndex = Math.floor(Math.random() * COINS.length);

  return coinValueList[randomIndex];
};

export const createRandomCoins = (amount: number): Coins => {
  const coins: Coins = { ...EMPTY_COIN };
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

export const sortCoins = (coins: Coins): Array<[string, number]> =>
  [...Object.entries(coins)].sort(([a], [b]) => +b - +a);
