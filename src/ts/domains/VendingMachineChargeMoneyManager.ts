import {
  ChargeMoneyManager,
  Coins,
} from '../types/vendingMachineChargeMoneyManager';

import { COINS } from '../constants/chargeMoney';

export default class VendingMachineChargeMoneyManager
  implements ChargeMoneyManager
{
  private coinsQuantity: Coins = { ...COINS.INITIAL_QUANTITY_STATE };

  getCoins() {
    return this.coinsQuantity;
  }

  getTotalAmount() {
    return Object.entries(this.coinsQuantity).reduce(
      (sum: number, [coin, count]: [string, number]) =>
        sum + Number(coin.replace('QUANTITY_COIN_', '')) * count,
      0
    );
  }

  addCoins(newCoinsQuantity: Coins): void {
    Object.entries(newCoinsQuantity).forEach(
      ([coin, count]: [string, number]) => {
        this.coinsQuantity[coin] += count;
      }
    );
  }

  getReturnCoins(userReturnMoney: number): Coins {
    let userMoney = userReturnMoney;
    const returnCoinsQuantity: Coins = {
      ...COINS.INITIAL_QUANTITY_STATE,
    };

    if (userMoney >= this.getTotalAmount()) {
      return this.coinsQuantity;
    }

    while (userMoney > 0) {
      if (this.coinsQuantity.QUANTITY_COIN_500 > 0 && userMoney - 500 >= 0) {
        this.coinsQuantity.QUANTITY_COIN_500 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_500 += 1;
        userMoney -= 500;

        continue;
      }

      if (this.coinsQuantity.QUANTITY_COIN_100 > 0 && userMoney - 100 >= 0) {
        this.coinsQuantity.QUANTITY_COIN_100 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_100 += 1;
        userMoney -= 100;

        continue;
      }

      if (this.coinsQuantity.QUANTITY_COIN_50 > 0 && userMoney - 50 >= 0) {
        this.coinsQuantity.QUANTITY_COIN_50 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_50 += 1;
        userMoney -= 50;

        continue;
      }

      if (this.coinsQuantity.QUANTITY_COIN_10 > 0 && userMoney - 10 >= 0) {
        this.coinsQuantity.QUANTITY_COIN_10 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_10 += 1;
        userMoney -= 10;

        continue;
      }
    }

    return returnCoinsQuantity;
  }
}
