import reducer from './reducer';
import Component from '../abstract/component';
import { Action, AppState, CoinRecord } from '../types';
import { CHARGED_COIN_KEY, COIN, INSERTED_MONEY_KEY, PRODUCT_LIST_KEY } from '../constants';
import { coinToMoney, convertArrToObj, toInt } from '../utils';

class Store {
  static _instance: null | Store = null;

  static get instance() {
    if (!Store._instance) {
      let chargedCoins = JSON.parse(localStorage.getItem(CHARGED_COIN_KEY) || '{}') as CoinRecord;
      if (Object.keys(chargedCoins).length < COIN.UNITS.length) {
        chargedCoins = convertArrToObj(COIN.UNITS, 0);
      }
      const chargedMoney = coinToMoney(chargedCoins);
      const productList = JSON.parse(localStorage.getItem(PRODUCT_LIST_KEY) || '[]');
      const insertedMoney = toInt(localStorage.getItem(INSERTED_MONEY_KEY) ?? '0');
      const changes = convertArrToObj(COIN.UNITS, 0) as CoinRecord;
      const initialState: AppState = {
        chargedMoney,
        chargedCoins,
        productList,
        insertedMoney,
        changes,
      };
      Store._instance = new Store(initialState);
    }
    return Store._instance;
  }

  private subscribers: Array<Component> = [];

  private state?: AppState;

  constructor(initialState: AppState) {
    if (Store._instance) {
      return Store._instance;
    }
    this.state = initialState;
    Store._instance = this;
  }

  getState(): AppState {
    return this.state as AppState;
  }

  subscribe(component: Component) {
    this.subscribers.push(component);
  }

  dispatch(action: Action) {
    this.state = reducer(this.getState(), action);
    this.subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  }
}

export default Store;
