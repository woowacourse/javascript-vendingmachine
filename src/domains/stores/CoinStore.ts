import { Action, CustomElement, MoneyStorage } from '../../abstracts/interfaces';
import { COIN_ACTION, MONEY_ACTION, PRODUCT_ACTION } from '../actions';

import { pickNumberInList } from '../../utils';
import { COIN, MONEY } from '../../constants';

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

  #customer: MoneyStorage = {
    money: MONEY.DEFAULT,
    coinsCount: {
      500: COIN.DEFAULT_COUNT,
      100: COIN.DEFAULT_COUNT,
      50: COIN.DEFAULT_COUNT,
      10: COIN.DEFAULT_COUNT,
    },
  };

  #machineSubscribers: CustomElement<MoneyStorage>[] = [];

  #customerSubscribers: CustomElement<MoneyStorage>[] = [];

  subscribeMachine(element: CustomElement<MoneyStorage>) {
    this.#machineSubscribers.push(element);
  }

  subscribeCustomer(element: CustomElement<MoneyStorage>) {
    this.#customerSubscribers.push(element);
  }

  dispatch(action: Action) {
    this.updateMoneyStorage(action);
    this.notifySubscribers(action);
  }

  // eslint-disable-next-line max-lines-per-function
  updateMoneyStorage(action: Action) {
    const { type, detail } = action;

    switch (type) {
      case COIN_ACTION.CHARGE: {
        this.#machine = this.generateNewMachine(this.#machine, detail as number);
        break;
      }
      case MONEY_ACTION.INPUT: {
        this.#customer.money += detail as number;
        break;
      }
      case PRODUCT_ACTION.PURCHASE:
        this.#customer.money -= detail as number;
        break;
      case COIN_ACTION.RETURN: {
        const { newMachine, newCustomer } = this.generateNewMoneyStorage(this.#machine, this.#customer);

        this.#machine = newMachine;
        this.#customer = newCustomer;
      }
    }
  }

  generateNewMachine(oldMachine: MoneyStorage, detail: number) {
    const newMachine = { ...oldMachine };
    let coinList = this.generateCoinList();
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

  generateCoinList() {
    return Object.keys(this.#machine.coinsCount)
      .reverse()
      .map((key) => Number(key));
  }

  generateNewCoinList(coinList: number[], money: number) {
    return coinList.filter((coin) => coin <= money);
  }

  generateNewMoneyStorage(oldMachine: MoneyStorage, oldCustomer: MoneyStorage) {
    const coinList = this.generateCoinList();
    const newMachine = { ...oldMachine };
    const newCustomer = { ...oldCustomer };

    coinList.forEach((coin) => {
      const needCoinCount = Math.floor(newCustomer.money / coin);
      const coinCount = newMachine.coinsCount[coin] > needCoinCount ? needCoinCount : newMachine.coinsCount[coin];

      newMachine.coinsCount[coin] -= coinCount;
      newMachine.money -= coinCount * coin;

      newCustomer.coinsCount[coin] = coinCount;
      newCustomer.money -= coinCount * coin;
    });

    return { newMachine, newCustomer };
  }

  // eslint-disable-next-line max-lines-per-function
  notifySubscribers({ type }: Action) {
    switch (type) {
      case COIN_ACTION.CHARGE:
        this.#machineSubscribers.forEach((subscriber) => {
          subscriber.rerender(this.#machine);
        });
        break;
      case MONEY_ACTION.INPUT:
      case PRODUCT_ACTION.PURCHASE:
        this.#customerSubscribers.forEach((subscriber) => {
          subscriber.rerender(this.#customer);
        });
        break;
      case COIN_ACTION.RETURN:
        this.#machineSubscribers.forEach((subscriber) => {
          subscriber.rerender(this.#machine);
        });
        this.#customerSubscribers.forEach((subscriber) => {
          subscriber.rerender(this.#customer);
        });
    }
  }

  get machine() {
    return this.#machine;
  }

  get customer() {
    return this.#customer;
  }
}

export default CoinStore;
