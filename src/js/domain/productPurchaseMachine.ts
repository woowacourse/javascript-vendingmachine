import {
  Returned,
  Spend,
  UserChangesDomain,
} from "../interface/user-changes.interface";
import { Charge, Coins } from "../interface/vending-changes.interface";
import { ERROR_MESSAGE, VENDING_MACHINE_NUMBER } from "../constant";
import { getLocalStorage, setLocalStorage } from "../util/localStorage";

export class ProductPurchaseMachine implements UserChangesDomain {
  chargedMoney: number;

  constructor() {
    this.chargedMoney = getLocalStorage("charged") ?? 0;
  }

  setChargedMoney(data: number) {
    setLocalStorage("charged", data);
  }

  getChargedMoney() {
    return this.chargedMoney;
  }

  charge: Charge = (money) => {
    this.checkDividedByMinimumCoin(money);
    this.checkMaxMoneyInput(money);
    this.checkMoenyUnderZero(money);

    this.chargedMoney += money;
    this.setChargedMoney(this.chargedMoney);
  };

  spend: Spend = (price, quantity) => {
    this.checkValidProductQuantity(quantity);
    this.checkValidChargedMoney(price, this.chargedMoney);

    this.chargedMoney -= price;
    this.setChargedMoney(this.chargedMoney);
  };

  returned: Returned = (returnedCoins: Coins) => {
    const returnedMoney = this.getTotalReturned(returnedCoins);
    this.chargedMoney -= returnedMoney;
    this.setChargedMoney(this.chargedMoney);
  };

  getTotalReturned = (returnedCoins: Coins): number =>
    Object.entries(returnedCoins).reduce(
      (sum, [coin, quantity]) => sum + Number(coin) * quantity,
      0
    );

  checkValidProductQuantity = (quantity: number): void => {
    if (quantity <= 0) {
      throw new Error(ERROR_MESSAGE.NO_PRODUCT);
    }
  };

  checkValidChargedMoney = (price: number, chargedMoney: number): void => {
    if (price > chargedMoney) {
      throw new Error(ERROR_MESSAGE.LACK_OF_BALANCE);
    }
  };

  checkDividedByMinimumCoin = (money: number): void => {
    if (money % VENDING_MACHINE_NUMBER.MINIMUM_COIN !== 0) {
      throw new Error(ERROR_MESSAGE.DIVIDED_BY_MINIMUM_COIN);
    }
  };

  checkMoenyUnderZero = (money: number) => {
    if (money <= 0) {
      throw new Error(ERROR_MESSAGE.MINIMUM_CHANGES);
    }
  };

  checkMaxMoneyInput = (money: number) => {
    if (money > VENDING_MACHINE_NUMBER.MAXIMUM_USER_INPUT) {
      throw new Error(ERROR_MESSAGE.MAXIMUM_USER_INPUT);
    }
  };
}

export const productPurchaseMachine = new ProductPurchaseMachine();
