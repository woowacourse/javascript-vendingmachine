import {
  Charge,
  Coins,
  GetCoins,
  GetTotalChanges,
  GenerateCoins,
  ChangesDomain,
} from "../interface/vending-changes.interface";
import { ERROR_MESSAGE, VENDING_MACHINE_NUMBER } from "../constant";

export class ChangesProcessMachine implements ChangesDomain {
  coins = { 500: 0, 100: 0, 50: 0, 10: 0 };

  charge: Charge = (money) => {
    this.checkDividedByMinimumCoin(money);
    this.checkMoneyOverMaximum(money);
    this.checkMoenyUnderZero(money);

    const newCoins = this.generateCoins(money);
    this.accumulateCoins(newCoins);
  };

  accumulateCoins = (newCoins: Coins): void => {
    this.coins = Object.entries(newCoins).reduce((acc, [coin, count]) => {
      return { ...acc, [coin]: this.coins[coin] + count };
    }, this.coins);
  };

  generateCoins: GenerateCoins = (money) => {
    const coinArray = [500, 100, 50, 10];
    const newCoins = { 500: 0, 100: 0, 50: 0, 10: 0 };

    while (money) {
      const idx = Math.floor(Math.random() * coinArray.length);
      if (money < coinArray[idx]) continue;
      newCoins[coinArray[idx]] += 1;
      money -= coinArray[idx];
    }

    return newCoins;
  };

  getCoins: GetCoins = () => {
    return this.coins;
  };

  getTotalChanges: GetTotalChanges = () => {
    return Object.entries(this.coins).reduce((acc, [coin, count]) => {
      return acc + Number(coin) * count;
    }, 0);
  };

  checkDividedByMinimumCoin = (money: number): void => {
    if (money % VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0) {
      throw new Error(ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
    }
  };

  checkMoneyOverMaximum = (money: number) => {
    if (
      this.getTotalChanges() + money >
      VENDING_MACHINE_NUMBER.MAXIMUM_CHANGES
    ) {
      throw new Error(ERROR_MESSAGE.MAXIMUM_CHANGES);
    }
  };

  checkMoenyUnderZero = (money: number) => {
    if (money <= 0) {
      throw new Error(ERROR_MESSAGE.MINIMUM_CHANGES);
    }
  };
}
export const changesProcessMachine = new ChangesProcessMachine();
