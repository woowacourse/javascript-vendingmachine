import { CustomElement } from '../../abstracts/interfaces';

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

  dispatch() {
    this.#isLoggedIn = !this.#isLoggedIn;
    this.notifySubscribers();
  }

  notifySubscribers() {
    this.#subscribers.forEach((subscriber) => subscriber.rerender(this.#isLoggedIn));
  }
}

export default AuthStore;
