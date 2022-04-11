import { COIN_TYPE } from '../constants';
import { Coins } from '../interface';

class VendingMachineCharge {
  coins: Coins = [0, 0, 0, 0];

  setCoins(coins: Coins) {
    this.coins = coins;
  }

  getTotalAmount(): number {
    return this.coins.reduce(
      (previous, coin, index) => (previous += COIN_TYPE[index] * coin),
      0,
    );
  }
}

export default new VendingMachineCharge();
