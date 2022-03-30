import { Action, CoinsCount, CustomElement } from '../../abstracts/types';
import { COIN_ACTION } from '../actions';
import { COIN, MONEY } from '../../constants';
import pickNumberInList from '../../utils/random';

class CoinStore {
  static _instance: null | object = null;

  static get instance(): object {
    if (!CoinStore._instance) {
      CoinStore._instance = new CoinStore();
    }

    return CoinStore._instance;
  }

  #money = MONEY.DEFAULT;

  #coinsCount: CoinsCount = {
    500: COIN.DEFAULT_COUNT,
    100: COIN.DEFAULT_COUNT,
    50: COIN.DEFAULT_COUNT,
    10: COIN.DEFAULT_COUNT,
  };

  #subscribers: CustomElement[] = [];

  subscribe(element: CustomElement): void {
    this.#subscribers.push(element);
  }

  dispatch(action: Action): void {
    this.updateMoneyOrCoinsCount(action);
    this.notifySubscribers();
  }

  updateMoneyOrCoinsCount(action: Action): void {
    const { detail } = action;
    this.#money += detail as number;
    this.#coinsCount = this.generateRandomCoins(this.#coinsCount, detail as number);
  }

  generateRandomCoins(oldCoinsCount: CoinsCount, detail: number): CoinsCount {
    const newCoinsCount = oldCoinsCount;
    let coinList = [500, 100, 50, 10];
    let money = detail;

    while (money) {
      const randomCoin = pickNumberInList(coinList);

      if (money < randomCoin) {
        coinList = this.generateNewCoinList(coinList, money);
        continue;
      }

      newCoinsCount[randomCoin] += 1;
      money -= randomCoin;
    }

    return newCoinsCount;
  }

  generateNewCoinList(coinList, money) {
    return coinList.filter((coin) => coin <= money);
  }

  notifySubscribers(): void {
    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(this.#money, this.#coinsCount);
    });
  }

  get money() {
    return this.#money;
  }

  get coinsCount() {
    return this.#coinsCount;
  }
}

export default CoinStore;
