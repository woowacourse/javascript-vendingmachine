import { Action, CustomElement, MoneyStorage } from '../../abstracts/interfaces';
import { COIN_ACTION } from '../actions';
import { COIN, MONEY } from '../../constants';
import { pickNumberInList } from '../../utils';

class CoinStore {
  static _instance: null | object = null;

  static get instance() {
    if (!CoinStore._instance) {
      CoinStore._instance = new CoinStore();
    }

    return CoinStore._instance;
  }

  #machine: MoneyStorage = {
    money: MONEY.DEFAULT,
    coinsCount: {
      500: COIN.DEFAULT_COUNT,
      100: COIN.DEFAULT_COUNT,
      50: COIN.DEFAULT_COUNT,
      10: COIN.DEFAULT_COUNT,
    },
  };

  #subscribers: CustomElement<MoneyStorage>[] = [];

  subscribe(element: CustomElement<MoneyStorage>) {
    this.#subscribers.push(element);
  }

  dispatch(action: Action) {
    this.updateMoneyStorage(action);
    this.notifySubscribers();
  }

  updateMoneyStorage(action: Action) {
    const { type, detail } = action;

    switch (type) {
      case COIN_ACTION.CHARGE: {
        this.#machine = this.generateNewMachine(this.#machine, detail as number);
      }
    }
  }

  generateNewMachine(oldMachine: MoneyStorage, detail: number) {
    const newMachine = { ...oldMachine };
    let coinList = [500, 100, 50, 10];
    let money = detail;

    while (money) {
      const randomCoin = pickNumberInList(coinList);

      if (money < randomCoin) {
        coinList = this.generateNewCoinList(coinList, money);
        continue;
      }

      newMachine.coinsCount[randomCoin] += 1;
      newMachine.money += randomCoin;
      money -= randomCoin;
    }

    return newMachine;
  }

  generateNewCoinList(coinList, money) {
    return coinList.filter((coin) => coin <= money);
  }

  notifySubscribers() {
    this.#subscribers.forEach((subscriber) => {
      subscriber.rerender(this.#machine);
    });
  }

  get machine() {
    return this.#machine;
  }
}

export default CoinStore;
