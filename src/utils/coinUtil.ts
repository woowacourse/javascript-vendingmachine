import { Coins } from '../domains/VendingMachine';

const getRandomCoin = (): number => {
  const coinValueList = [10, 50, 100, 500];
  const randomIndex = Math.floor(Math.random() * 4);

  return coinValueList[randomIndex];
};

export const createRandomCoins = (amount: number): Coins => {
  const coins: Coins = {
    10: 0,
    50: 0,
    100: 0,
    500: 0,
  };
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
