import { pickNumberInList } from "../utils/common";
import { verifyCharge } from "../utils/validation";

interface ChargeManagerInterface {
  getTotalCoins(): Coin;
  addCoins(coinObject: Coin): void;
  getTotalCharge(): number;
  getRandomCoins(charge: number): Coin;
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

  getRandomCoins(charge: number): Coin {
    verifyCharge(charge);

    const coinObject = { 10: 0, 50: 0, 100: 0, 500: 0 };
    let coinList = [10, 50, 100, 500];

    while (charge) {
      coinList = coinList.filter((coin) => coin <= charge);
      const randomCoin = pickNumberInList(coinList);
      coinObject[randomCoin]++;
      charge -= randomCoin;
    }

    return coinObject;
  }

  addCoins(coinObject: Coin) {
    Object.keys(coinObject).forEach((coinName) => {
      this.coins[coinName] += coinObject[coinName];
    });
  }

  getTotalCharge() {
    return Object.entries(this.coins).reduce((acc, [coinName, count]) => {
      return acc + Number(coinName) * count;
    }, 0);
  }
}

export default ChargeManager;
