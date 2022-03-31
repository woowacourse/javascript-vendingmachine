import { verifyDuplicateName } from "../utils/validation";

interface ChargeManagerInterface {
  getCoins(): Coin;
}

export interface Coin {
  10: number;
  50: number;
  100: number;
  500: number;
}

class ChargeManager implements ChargeManagerInterface {
  private coins: Coin = { 10: 0, 50: 0, 100: 0, 500: 0 };

  getCoins() {
    return this.coins;
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
