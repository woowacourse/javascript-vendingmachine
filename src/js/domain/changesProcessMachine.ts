import {
  Charge,
  Coins,
  GetCoins,
  GetTotalChanges,
  GenerateCoins,
  ChangesDomain,
} from "../interface/changes.interface";

class ChangesProcessMachine implements ChangesDomain {
  coins = { 500: 0, 100: 0, 50: 0, 10: 0 };

  charge: Charge = (money) => {
    this.checkDividedByMinimumCoin(money);
    this.checkMoneyOverMaximum(money);
    this.checkMoenyUnderZero(money);

    const newCoins = this.generateCoins(money);
    this.accumulateCoins(newCoins);
    console.log(this.coins);
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
    if (money % 10 !== 0) {
      throw new Error("투입된 금액은 10으로 나누어 떨어져야합니다.");
    }
  };

  checkMoneyOverMaximum = (money: number) => {
    if (this.getTotalChanges() + money > 100000) {
      throw new Error("최대 잔액은 100000원 입니다.");
    }
  };

  checkMoenyUnderZero = (money: number) => {
    if (money <= 0) {
      throw new Error("금액은 0원보다 높아야합니다.");
    }
  };
}

export default ChangesProcessMachine;
