/* eslint-disable max-lines-per-function */
interface CoinStatus {
  FIVE_HUNDRED_WON: number;
  ONE_HUNDRED_WON: number;
  FIFTY_WON: number;
  TEN_WON: number;
}

interface distributeStrategy {
  distribute(inputMoney: number): CoinStatus;
}

const RandomStrategy: distributeStrategy = {
  distribute(inputMoney: number): CoinStatus {
    const coins = {
      FIVE_HUNDRED_WON: 500,
      ONE_HUNDRED_WON: 100,
      FIFTY_WON: 50,
      TEN_WON: 10,
    };
    const initialCoins = {
      FIVE_HUNDRED_WON: 0,
      ONE_HUNDRED_WON: 0,
      FIFTY_WON: 0,
      TEN_WON: 0,
    };

    let currentMoney = inputMoney;

    return Object.entries(coins).reduce((currentCoinList, [key, value]) => {
      if (key === 'TEN_WON') {
        currentCoinList[key] = currentMoney / 10;
        return currentCoinList;
      }

      const max = Math.floor(currentMoney / value);
      const count = Math.floor(Math.random() * (max + 1));
      currentCoinList[key] = count;
      currentMoney -= count * value;
      return currentCoinList;
    }, initialCoins);
  },
};

export default RandomStrategy;
