import reducer from './reducer';
import Component from '../abstract/component';

type Action = {
  type: string;
  payload: string | number | Record<string, unknown>;
};

class Store {
  static _instance: null | Store = null;

  static get instance() {
    if (!Store._instance) {
      Store._instance = new Store({});
    }
    return Store._instance;
  }

  #subscribers: Array<Component> = [];

  #state = {};

  constructor(initialState: Record<string, unknown>) {
    if (Store._instance) {
      // eslint-disable-next-line no-constructor-return
      return Store._instance;
    }
    this.#state = initialState;
    Store._instance = this;
  }

  getState() {
    return this.#state;
  }

  subscribe(component: Component) {
    this.#subscribers.push(component);
  }

  dispatch(action: Action) {
    this.#state = reducer(this.getState(), action);
    this.#subscribers.forEach((subscriber) => {
      subscriber.notify();
    });
  }
}
new Store({});

export default Store;
