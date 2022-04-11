import reducer from './reducer';
import Component from '../abstract/component';
import { Action, AppState } from '../types';
import { INITIAL_STATE } from '../constatns/flux-constants';

class Store {
  static _instance: null | Store = null;

  static get instance() {
    if (!Store._instance) {
      Store._instance = new Store(INITIAL_STATE);
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
