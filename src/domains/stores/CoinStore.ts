import { Action, CoinsCount, CustomElement } from '../../abstracts/types';
import { COIN, MONEY } from '../../constants';
import pickNumberInList from '../../utils/random';

class CoinStore {
  static _instance: null | object = null;

  static get instance() {
    if (!CoinStore._instance) {
      CoinStore._instance = new CoinStore();
    }

    return CoinStore._instance;
  }

  #coinsCount: CoinsCount = {
    500: COIN.DEFAULT_COUNT,
    100: COIN.DEFAULT_COUNT,
    50: COIN.DEFAULT_COUNT,
    10: COIN.DEFAULT_COUNT,
    sum: MONEY.DEFAULT,
  };

  #subscribers: CustomElement[] = [];

  subscribe(element: CustomElement) {
    this.#subscribers.push(element);
  }

  dispatch(action: Action) {
    this.updateCoinsCount(action);
    this.notifySubscribers();
  }

  updateCoinsCount(action: Action) {
    const { detail } = action;
    this.#coinsCount = this.generateRandomCoins(this.#coinsCount, detail as number);
  }

  generateRandomCoins(oldCoinsCount: CoinsCount, detail: number) {
    const newCoinsCount = oldCoinsCount;
    let coinList = [500, 100, 50, 10];
    let money = detail; // 들어온 돈

    while (money) {
      const randomCoin = pickNumberInList(coinList);

      if (money < randomCoin) {
        coinList = this.generateNewCoinList(coinList, money);
        continue;
      }

      newCoinsCount[randomCoin] += 1;
      newCoinsCount.sum += randomCoin;
      money -= randomCoin;
    }

    return newCoinsCount;
  }

  generateNewCoinList(coinList: number[], money: number) {
    return coinList.filter((coin) => coin <= money);
  }

  notifySubscribers() {
    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(this.#coinsCount);
    });
  }

  get coinsCount() {
    return this.#coinsCount;
  }
}

export default CoinStore;
