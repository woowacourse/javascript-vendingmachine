import { ALERT_MESSAGE, ERROR_MESSAGE, RULES } from '../constants';
import { Coin } from '../interfaces/VendingMachine.interface';
import { getRandomInt } from '../utils/utils';

class CoinModel {
  protected availableCoinTypeList: Array<number>;

  constructor() {
    this.availableCoinTypeList = [500, 100, 50, 10, 0];
  }

  getCoinsValue(coins: Coin) {
    return coins.coin10 * 10 + coins.coin50 * 50 + coins.coin100 * 100 + coins.coin500 * 500;
  }

  makeChangesToCoin(inputMoney: number, vendingMachineChanges: Coin) {
    const coin = this.getRandomChangeCoin(inputMoney);
    inputMoney -= coin;

    switch (coin) {
      case 500:
        vendingMachineChanges.coin500 += 1;
        break;
      case 100:
        vendingMachineChanges.coin100 += 1;
        break;
      case 50:
        vendingMachineChanges.coin50 += 1;
        break;
      case 10:
        vendingMachineChanges.coin10 += 1;
        break;
    }

    if (inputMoney >= RULES.MINIMUM_CHANGE) {
      this.makeChangesToCoin(inputMoney, vendingMachineChanges);
    }
  }

  returnChanges(userMoney: number, setUserMoney: Function, userChanges: Coin, vendingMachineChanges: Coin) {
    const coin = this.getChangeCoin(userMoney, vendingMachineChanges);
    setUserMoney(userMoney - coin);
    userMoney -= coin;

    switch (coin) {
      case 500:
        vendingMachineChanges.coin500 -= 1;
        userChanges.coin500 += 1;
        break;
      case 100:
        vendingMachineChanges.coin100 -= 1;
        userChanges.coin100 += 1;
        break;
      case 50:
        vendingMachineChanges.coin50 -= 1;
        userChanges.coin50 += 1;
        break;
      case 10:
        vendingMachineChanges.coin10 -= 1;
        userChanges.coin10 += 1;
        break;
      case 0:
        if (userMoney > 0) {
          throw new Error(ERROR_MESSAGE.NOT_ENOUGH_RETURN_CHANGE);
        }
        break;
    }

    if (userMoney >= RULES.MINIMUM_CHANGE) {
      this.returnChanges(userMoney, setUserMoney, userChanges, vendingMachineChanges);
    }

    return ALERT_MESSAGE.RETURN_CHARGE_SUCCESS;
  }

  private getChangeCoin(vendingMachinemoney: number, vendingMachineChanges: Coin) {
    const coins = this.availableCoinTypeList.filter(coin => {
      if (vendingMachinemoney < coin) {
        return false;
      }

      switch (coin) {
        case 500:
          if (vendingMachineChanges.coin500 > 0) {
            return true;
          }
          break;
        case 100:
          if (vendingMachineChanges.coin100 > 0) {
            return true;
          }
          break;
        case 50:
          if (vendingMachineChanges.coin50 > 0) {
            return true;
          }
          break;
        case 10:
          if (vendingMachineChanges.coin10 > 0) {
            return true;
          }
          break;
        case 0:
          return true;
      }

      return false;
    });

    return coins[0];
  }

  private getRandomChangeCoin(money: number) {
    const coins = this.availableCoinTypeList.filter(coin => coin <= money);
    const index = getRandomInt(coins.length);
    return coins[index];
  }
}

const coinModel = new CoinModel();

export default coinModel;
