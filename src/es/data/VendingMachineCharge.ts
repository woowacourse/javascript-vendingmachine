import { COIN_TYPE } from '../constants';
import { TCoins } from '../interface';

class VendingMachineCharge {
  coins: TCoins = [0, 0, 0, 0];

  setCoins(coins: TCoins) {
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
