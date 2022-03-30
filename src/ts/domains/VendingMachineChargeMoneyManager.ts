import {
  ChargeMoneyManager,
  Coins,
} from '../types/vendingMachineChargeMoneyManager';

import { COINS } from '../constants/chargeMoney';
import { checkCanAddMoney } from '../validation/checkChargeMoney';

export default class VendingMachineCoinManager implements ChargeMoneyManager {
  private coins: Coins = { ...COINS.INITIAL_STATE };

  getCoins() {
    return this.coins;
  }

  getTotalAmount() {
    return Object.entries(this.coins).reduce(
      (sum: number, [coin, count]: [string, number]) =>
        sum + Number(coin.replace('COIN_', '')) * count,
      0
    );
  }

  addCoins(newCoins: Coins) {
    checkCanAddMoney(this.getTotalAmount(), newCoins);

    Object.entries(newCoins).forEach(([coin, count]: [string, number]) => {
      this.coins[coin] += count;
    });
  }
}
