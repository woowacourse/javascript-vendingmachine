import VendingMachine from './domain/VendingMachine';
import Authorization from './domain/Authorization';
import PurchaseProductTab from './view/PurchaseProductTab';
import AddChangeTab from './view/AddChangeTab';
import ManageProductTab from './view/ManageProductTab';
import { createMainElement, selectDom } from './utils/dom';
import {
  loginLinkButtonTemplate,
  navigationTemplate,
  notFoundTabTemplate,
  userButtonTemplate,
} from './view/template';
import Snackbar from './view/Snackbar';
import LoginPage from './view/LoginPage';
import RegisterPage from './view/RegisterPage';

class App {
  #vendingMachine;
  #authorization;
  #renderList;
  #headerContainer;
  #appContainer;
  #tabMenuNavigation;

  constructor() {
    this.snackBar = new Snackbar();
    this.#vendingMachine = new VendingMachine();
    this.#authorization = new Authorization();
    this.#renderList = {
      '#/login': new LoginPage(),
      '#/register': new RegisterPage(this.#authorization, this.snackBar),
      '#/manage': new ManageProductTab(this.#vendingMachine, this.snackBar),
      '#/charge': new AddChangeTab(this.#vendingMachine, this.snackBar),
      '#/purchase': new PurchaseProductTab(this.#vendingMachine, this.snackBar),
    };
    this.#headerContainer = selectDom('header');
    this.#appContainer = selectDom('#app');

    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);

    // this.#tabMenuNavigation = selectDom('#tab-menu-navigation');
    // this.#tabMenuNavigation.addEventListener('click', this.#handleTabMenuChange);
  }

  #render = () => {
    const path =
      window.location.hash ||
      (this.#authorization.isLoggedIn ? '#/manage' : '#/purchase');

    this.#renderNav(path);
    this.#updateUserButton();

    if (!this.#renderList[path]) {
      const notFoundContainer = createMainElement(notFoundTabTemplate);
      this.#appContainer.replaceChild(notFoundContainer, selectDom('main'));
      return;
    }

    this.#appContainer.replaceChild(
      this.#renderList[path].tabElements,
      selectDom('main')
    );
  };

  #renderNav(path) {
    if (!this.#authorization.isLoggedIn) {
      selectDom('#tab-menu-navigation')?.remove();
      return;
    }

    this.#tabMenuNavigation = selectDom('#tab-menu-navigation');

    if (!this.#tabMenuNavigation) {
      this.#headerContainer.insertAdjacentHTML('beforeend', navigationTemplate);
      this.#tabMenuNavigation = selectDom('#tab-menu-navigation', this.#headerContainer);
    }

    const previousMenuButton = selectDom('.current', this.#tabMenuNavigation);
    previousMenuButton?.classList.remove('current');

    const currentMenuButton = selectDom(`[href="${path}"]`, this.#tabMenuNavigation);
    currentMenuButton?.classList.add('current');
  }

  #updateUserButton() {
    selectDom('#user-button', this.#appContainer)?.remove();
    selectDom('#login-link-button', this.#appContainer)?.remove();

    if (this.#authorization.isLoggedIn) {
      this.#appContainer.insertAdjacentHTML('afterbegin', userButtonTemplate('test'));
      return;
    }
    this.#appContainer.insertAdjacentHTML('afterbegin', loginLinkButtonTemplate);
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

new App();
