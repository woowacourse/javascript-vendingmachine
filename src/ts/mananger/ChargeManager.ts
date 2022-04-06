import { pickNumberInList } from "../utils/common";
import { verifyCharge } from "../utils/validation";

interface ChargeManagerInterface {
  getTotalCoins(): Coin;
  getTotalCharge(): number;
  getRandomCoins(charge: number): Coin;
  getReturnCoins(amount: number): Coin;
  addCoins(coinObject: Coin): void;
  substractCoins(coinObject: Coin): void;
  convertCoinsToAmount(coinObject: Coin): number;
}

export interface Coin {
  10: number;
  50: number;
  100: number;
  500: number;
}

class ChargeManager implements ChargeManagerInterface {
  private coins: Coin = { 10: 0, 50: 0, 100: 0, 500: 0 };

  getTotalCoins() {
    return this.coins;
  }

  getTotalCharge() {
    return this.convertCoinsToAmount(this.coins);
  }

  getRandomCoins(charge: number): Coin {
    verifyCharge(charge);

    const coinObject = { 10: 0, 50: 0, 100: 0, 500: 0 };
    let coinList = [10, 50, 100, 500];

    while (charge) {
      coinList = coinList.filter((coinAmount) => coinAmount <= charge);
      const randomCoinAmount = pickNumberInList(coinList);
      coinObject[randomCoinAmount]++;
      charge -= randomCoinAmount;
    }

    return coinObject;
  }

  getReturnCoins(amount: number): Coin {
    const coinObject = { 10: 0, 50: 0, 100: 0, 500: 0 };
    const coinList = [500, 100, 50, 10];

    coinList.forEach((coinAmount) => {
      if (amount === 0) {
        return;
      }
      const requireCoinCount = Math.floor(amount / coinAmount);
      const balanceCoinCount = this.coins[coinAmount];
      const returnCoinCount = Math.min(requireCoinCount, balanceCoinCount);

      amount -= coinAmount * returnCoinCount;
      coinObject[coinAmount] += returnCoinCount;
    });

    return coinObject;
  }

  addCoins(coinObject: Coin) {
    Object.keys(coinObject).forEach((coinAmount) => {
      this.coins[coinAmount] += coinObject[coinAmount];
    });
  }

  substractCoins(coinObject: Coin) {
    Object.keys(coinObject).forEach((coinName) => {
      this.coins[coinName] -= coinObject[coinName];
    });
  }

  convertCoinsToAmount(coinObject: Coin) {
    return Object.entries(coinObject).reduce((acc, [coinAmount, count]) => {
      return acc + Number(coinAmount) * count;
    }, 0);
  }
}

export default ChargeManager;
