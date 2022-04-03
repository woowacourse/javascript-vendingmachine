import { COIN_TYPE } from '../constants';

class VendingMachineCharge {
  coins = [0, 0, 0, 0];

  setCoins(coins) {
    this.coins = coins;
    console.log(this.coins);
  }

  getTotalAmount(): number {
    return this.coins.reduce(
      (previous, coin, index) => (previous += COIN_TYPE[index] * coin),
      0,
    );
  }
}
export default new VendingMachineCharge();
