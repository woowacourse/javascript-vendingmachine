import { getRandomNumber } from '@Utils/index';
import { COIN_TYPE } from '@Constants/index';

interface IState {
  coins: Array<number>;
}

interface IHoldingAmountManager {
  state: IState;
  subscribers: Array<object>;

  addSubscriber(subscriber: object): void;
  setState(newState: IState): void;
  getState(): IState;

  addAmount(amount: number): void;
}

class HoldingAmountManager implements IHoldingAmountManager {
  state = {
    coins: [0, 0, 0, 0],
  };

  subscribers = [];

  addSubscriber(subscriber: object) {
    this.subscribers.push(subscriber);
  }

  setState(newState: IState) {
    this.state = { ...this.state, ...newState };
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  getState(): IState {
    return { ...this.state };
  }

  getMaxCoinIndex(baseAmount) {
    return COIN_TYPE.findIndex(coin => baseAmount >= coin);
  }

  getRandomCoinsFromAmount(amount: number): Array<number> {
    let leftAmount: number = amount;
    const returnCoins = [0, 0, 0, 0];

    while (leftAmount > 0) {
      const coinIndex = getRandomNumber(this.getMaxCoinIndex(leftAmount), COIN_TYPE.length - 1);
      const randomCoin = COIN_TYPE[coinIndex];

      returnCoins[coinIndex] += 1;
      leftAmount -= randomCoin;
    }
    return returnCoins;
  }

  addAmount(amount: number): void {
    const coinsToAdd = this.getRandomCoinsFromAmount(amount);
    const totalCoins = this.state.coins.map((value, index) => value + coinsToAdd[index]);
    this.setState({
      coins: totalCoins,
    });
  }
}

export default new HoldingAmountManager();
