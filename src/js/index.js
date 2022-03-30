import VendingMachine from './domain/VendingMachine';
import PurchaseProductTab from './view/PurchaseProductTab';
import AddChangeTab from './view/AddChangeTab';
import ManageProductTab from './view/ManageProductTab';
import { createMainElement, selectDom } from './utils/dom';
import { notFoundTabTemplate } from './view/template';

class App {
  #vendingMachine;
  #renderList;
  #appContainer;
  #tabMenuNavigation;

  constructor() {
    this.#vendingMachine = new VendingMachine();
    this.#renderList = {
      '#/manage': new ManageProductTab(this.#vendingMachine),
      '#/charge': new AddChangeTab(this.#vendingMachine),
      '#/purchase': new PurchaseProductTab(),
    };
    this.#appContainer = selectDom('#app');
    this.#tabMenuNavigation = selectDom('#tab-menu-navigation');

    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
    this.#tabMenuNavigation.addEventListener('click', this.#handleTabMenuChange);
  }

  #render = () => {
    const path = window.location.hash || '#/manage';

    this.#updateCurrentTabMenu(path);

    if (!this.#renderList[path]) {
      const notFoundContainer = createMainElement(notFoundTabTemplate);
      this.#appContainer.replaceChild(notFoundContainer, selectDom('main'));
      return;
    }

    this.#appContainer.replaceChild(this.#renderList[path].tabElements, selectDom('main'));
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

    if (!Object.keys(this.#renderList).includes(newHash) || newHash === previousHash) return;

    window.history.pushState({}, null, newHash);
    this.#render();
  };
}

new App();
