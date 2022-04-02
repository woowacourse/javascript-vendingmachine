import VendingMachine from '../domain/VendingMachine';
import PurchaseProductTab from './PurchaseProductTab';
import AddChangeTab from './AddChangeTab';
import ManageProductTab from './ManageProductTab';
import { createMainElement, selectDom } from '../utils/dom';
import { notFoundTemplate } from './template';

export default class Router {
  #vendingMachine;
  #renderList;
  #app;
  #tabMenuNavigation;

  constructor() {
    this.#vendingMachine = new VendingMachine();
    this.#renderList = {
      '#/manage': () => new ManageProductTab(this.#vendingMachine),
      '#/charge': () => new AddChangeTab(this.#vendingMachine),
      '#/purchase': () => new PurchaseProductTab(this.#vendingMachine),
    };
    this.#app = selectDom('#app');
    this.#tabMenuNavigation = selectDom('#tab-menu-navigation');

    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
    this.#tabMenuNavigation.addEventListener('click', this.#handleTabMenuChange);
  }

  #render = () => {
    const path = window.location.hash || '#/manage';

    this.#updateCurrentTabMenu(path);
    const main = selectDom('main');

    if (!this.#renderList[path]) {
      const notFoundContainer = createMainElement(notFoundTemplate);
      this.#app.replaceChild(notFoundContainer, main);
      return;
    }

    this.#app.replaceChild(this.#renderList[path]().tabElements, main);
  };

  #updateCurrentTabMenu(path) {
    const previousMenuButton = selectDom('.current', this.#tabMenuNavigation);
    previousMenuButton?.classList.remove('current');

    const currentMenuButton = selectDom(`[href="${path}"]`, this.#tabMenuNavigation);
    currentMenuButton?.classList.add('current');
  }

  #handleTabMenuChange = (e) => {
    e.preventDefault();

    const { hash: newHash } = e.target;
    const previousHash = window.location.hash;

    if (!Object.keys(this.#renderList).includes(newHash) || newHash === previousHash) {
      return;
    }

    window.history.pushState({}, null, newHash);
    this.#render();
  };
}
