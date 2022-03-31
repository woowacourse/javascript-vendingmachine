import {
  ChargeMoneyManager,
  Coins,
} from '../types/vendingMachineChargeMoneyManager';

import { COINS } from '../constants/chargeMoney';
import { checkCanAddMoney } from '../validation/checkChargeMoney';
import pickRandomIndex from '../utils/utils';

const generateRandomCoins = (money: number): Coins => {
  const coinList: number[] = COINS.INITIAL_LIST;
  const coinsQuantity: Coins = { ...COINS.INITIAL_QUANTITY_STATE };

  let remainMoney: number = money;

  while (remainMoney) {
    const pickableCoins: number[] = coinList.filter(
      (coin: number) => coin <= remainMoney
    );
    const pickedCoin: number =
      pickableCoins[pickRandomIndex(0, pickableCoins.length - 1)];
    coinsQuantity[`QUANTITY_COIN_${pickedCoin}`] += 1;
    remainMoney -= pickedCoin;
  }

  return coinsQuantity;
};

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

  addCoins(newChargeMoney: number): void {
    const newCoinsQuantity = generateRandomCoins(newChargeMoney);
    checkCanAddMoney(this.getTotalAmount(), newCoinsQuantity);

    Object.entries(newCoinsQuantity).forEach(
      ([coin, count]: [string, number]) => {
        this.coinsQuantity[coin] += count;
      }
    );
  }
}
