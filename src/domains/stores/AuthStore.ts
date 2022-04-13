import { Action, CustomElement } from '../../abstracts/interfaces';
import { AUTH_ACTION } from '../actions';

class AuthStore {
  static _instance: null | object = null;

  static get instance() {
    if (!AuthStore._instance) {
      AuthStore._instance = new AuthStore();
    }

    return AuthStore._instance;
  }

  #isLoggedIn = false;

  #subscribers: CustomElement<boolean>[] = [];

  subscribe(element: CustomElement<boolean>) {
    this.#subscribers.push(element);
  }

  dispatch({ type }: Action) {
    switch (type) {
      case AUTH_ACTION.LOGIN:
        this.#isLoggedIn = true;
        break;
      case AUTH_ACTION.LOGOUT:
        this.#isLoggedIn = false;
    }

    this.notifySubscribers();
  }

  notifySubscribers() {
    this.#subscribers.forEach((subscriber) => subscriber.rerender(this.#isLoggedIn));
  }

  get isLoggedIn() {
    return this.#isLoggedIn;
  }
}

export default AuthStore;
