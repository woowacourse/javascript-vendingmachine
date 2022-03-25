import VendingMachine from '../domain/VendingMachine';
import PurchaseProductTab from './PurchaseProductTab';
import AddChangeTab from './AddChangeTab';
import ManageProductTab from './ManageProductTab';
import selectDom from '../utils/selectDom';

export default class Router {
  #app;
  #tabMenuNavigation;
  #renderList;
  #vendingMachine;

  constructor() {
    this.#app = selectDom('#app');
    this.#tabMenuNavigation = selectDom('#tab-menu-navigation');
    this.#vendingMachine = new VendingMachine();
    this.#renderList = {
      '#/manage': new ManageProductTab(this.#vendingMachine),
      '#/charge': new AddChangeTab(this.#vendingMachine),
      '#/purchase': new PurchaseProductTab(),
    };
    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
    this.#tabMenuNavigation.addEventListener('click', this.#handleTabMenuChange);
  }

  #render = () => {
    const path = window.location.hash || '#/manage';

    this.#updateCurrentTabMenu(path);
    const main = selectDom('main');

    this.#app.replaceChild(this.#renderList[path].tabElements, main);
  };

  #updateCurrentTabMenu(path) {
    const previousMenuButton = selectDom('.current', this.#tabMenuNavigation);
    previousMenuButton?.classList.remove('current');

    const currentMenuButton = selectDom(`[href="${path}"]`, this.#tabMenuNavigation);
    currentMenuButton.classList.add('current');
  }

  #handleTabMenuChange = (e) => {
    const { hash: newHash } = e.target;
    const previousHash = window.location.hash;

    if (!Object.keys(this.#renderList).includes(newHash)) return;

    if (newHash === previousHash) return;

    e.preventDefault();

    window.history.pushState({}, null, newHash);
    this.#render();
  };
}
