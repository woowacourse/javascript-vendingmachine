import { getRandomNumber } from '@Utils/index';
import { COIN_TYPE } from '@Constants/index';
import Store from './Abstract';

type IState = Record<'coins', Array<number>>;

class HoldingAmountStore extends Store {
  protected state: IState = {
    coins: [0, 0, 0, 0],
  };

  getTotalAmount(): number {
    return this.state.coins.reduce(
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
    const totalCoins: Array<number> = this.state.coins.map(
      (value, index) => value + coinsToAdd[index],
    );

    this.setState({
      coins: totalCoins,
    });
  }
}

export default new HoldingAmountStore();
