import { getRandomNumber } from 'Utils';
import { COIN_TYPE } from 'Constants';
import Store from './Abstract';

class HoldingAmountStore extends Store {
  protected state = {
    holdingCoins: [0, 0, 0, 0],
    returnCoins: [0, 0, 0, 0],
  };

  getTotalAmount(): number {
    return this.state.holdingCoins.reduce(
      (previous, coin, index) => (previous += COIN_TYPE[index] * coin),
      0,
    );
  }

  getMaxCoinIndex(baseAmount) {
    return COIN_TYPE.findIndex(coin => baseAmount >= coin);
  }

  getRandomCoinsFromAmount(amount: number): Array<number> {
    let leftAmount: number = amount;
    const randomCoins = [0, 0, 0, 0];

    while (leftAmount > 0) {
      const coinIndex: number = getRandomNumber(
        this.getMaxCoinIndex(leftAmount),
        COIN_TYPE.length - 1,
      );
      const randomCoin: number = COIN_TYPE[coinIndex];

      randomCoins[coinIndex] += 1;
      leftAmount -= randomCoin;
    }
    return randomCoins;
  }

  addAmount(amount: number): void {
    const coinsToAdd: Array<number> = this.getRandomCoinsFromAmount(amount);
    const totalCoins: Array<number> = this.state.holdingCoins.map(
      (value, index) => value + coinsToAdd[index],
    );

    this.setState({
      holdingCoins: totalCoins,
    });
  }
}

export default new HoldingAmountStore();
