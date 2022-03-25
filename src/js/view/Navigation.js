import VendingMachine from '../domain/VendingMachine';
import ManageProductTab from './ManageProductTab';
import AddChangeTab from './AddChangeTab';
import PurchaseProductTab from './PurchaseProductTab';

export default class Navigation {
  #app;
  #tabMenuNavigation;
  #main;
  #renderList;
  #vendingMachine;

  constructor() {
    this.#app = document.querySelector('#app');
    this.#tabMenuNavigation = document.querySelector('#tab-menu-navigation');
    this.#vendingMachine = new VendingMachine();
    this.#renderList = {
      '#/manage': new ManageProductTab(this.#vendingMachine),
      '#/charge': new AddChangeTab(),
      '#/purchase': new PurchaseProductTab(),
    };
    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
    this.#tabMenuNavigation.addEventListener(
      'click',
      this.#handleTabMenuChange
    );
  }

  #render = () => {
    const path = window.location.hash || '#/manage';

    this.#updateCurrentTabMenu(path);
    const main = document.querySelector('main');

    this.#app.replaceChild(this.#renderList[path].tabElements, main);
  };

  #updateCurrentTabMenu(path) {
    const previousMenuButton =
      this.#tabMenuNavigation.querySelector('.current');
    previousMenuButton?.classList.remove('current');

    const currentMenuButton = this.#tabMenuNavigation.querySelector(
      `[href="${path}"]`
    );
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
