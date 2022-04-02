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

  getReturnCoins(userMoney: number): Coins {}
}
