import {
  ChargeMoneyCoins,
  ChargeMoneyManager,
  Coins,
} from '../types/vendingMachineChargeMoneyManager';

import { COINS } from '../constants/chargeMoney';

export default class VendingMachineChargeMoneyManager
  implements ChargeMoneyManager
{
  private coinsQuantity: Coins = { ...COINS.INITIAL_QUANTITY_STATE };
  private userMoney = 0;

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

  canSubtractCoinQuantity(coin: ChargeMoneyCoins): boolean {
    return (
      this.coinsQuantity[`QUANTITY_COIN_${coin}`] > 0 &&
      this.userMoney - coin >= 0
    );
  }

  getReturnCoins(userReturnMoney: number): Coins {
    this.userMoney = userReturnMoney;
    let returnCoinsQuantity: Coins = {
      ...COINS.INITIAL_QUANTITY_STATE,
    };

    if (this.userMoney >= this.getTotalAmount()) {
      returnCoinsQuantity = this.coinsQuantity;
      this.coinsQuantity = { ...COINS.INITIAL_QUANTITY_STATE };

      return returnCoinsQuantity;
    }

    while (this.userMoney > 0) {
      if (this.canSubtractCoinQuantity(500)) {
        this.coinsQuantity.QUANTITY_COIN_500 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_500 += 1;
        this.userMoney -= 500;

        continue;
      }

      if (this.canSubtractCoinQuantity(100)) {
        this.coinsQuantity.QUANTITY_COIN_100 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_100 += 1;
        this.userMoney -= 100;

        continue;
      }

      if (this.canSubtractCoinQuantity(50)) {
        this.coinsQuantity.QUANTITY_COIN_50 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_50 += 1;
        this.userMoney -= 50;

        continue;
      }

      if (this.canSubtractCoinQuantity(10)) {
        this.coinsQuantity.QUANTITY_COIN_10 -= 1;
        returnCoinsQuantity.QUANTITY_COIN_10 += 1;
        this.userMoney -= 10;

        continue;
      }
    }

    return returnCoinsQuantity;
  }
}
