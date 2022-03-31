import {
  ICharge,
  ICoins,
  IGetCoins,
  IGetTotalChanges,
  IGenerateCoins,
  IChangeProcessMachine,
} from "../interface/changes.interface";
import {
  checkDividedByMinimumCoin,
  checkMoneyOverMaximum,
  checkMoneyUnderZero,
} from "../util/validations";
class ChangesProcessMachine implements IChangeProcessMachine {
  coins = { 500: 0, 100: 0, 50: 0, 10: 0 };

  charge: ICharge = (money) => {
    checkDividedByMinimumCoin(money);
    checkMoneyOverMaximum(this.getTotalChanges() + money);
    checkMoneyUnderZero(money);

    const newCoins = this.generateCoins(money);
    this.accumulateCoins(newCoins);
  };

  accumulateCoins = (newCoins: ICoins): void => {
    this.coins = Object.entries(newCoins).reduce((acc, [coin, count]) => {
      return { ...acc, [coin]: this.coins[coin] + count };
    }, this.coins);
  };

  generateCoins: IGenerateCoins = (money) => {
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

  getCoins: IGetCoins = () => {
    return this.coins;
  };

  getTotalChanges: IGetTotalChanges = () => {
    return Object.entries(this.coins).reduce((acc, [coin, count]) => {
      return acc + Number(coin) * count;
    }, 0);
  };
}

export default ChangesProcessMachine;
