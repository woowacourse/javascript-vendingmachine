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
  userButtonSelectBoxTemplate,
  userButtonTemplate,
} from './view/template';
import Snackbar from './view/Snackbar';
import LoginPage from './view/LoginPage';
import RegisterPage from './view/RegisterPage';
import UserInfoPage from './view/UserInfoPage';

class App {
  #vendingMachine;
  #authorization;
  #userRenderList;
  #nonUserRenderList;
  #headerContainer;
  #appContainer;
  #tabMenuNavigation;

  constructor() {
    this.snackBar = new Snackbar();
    this.#vendingMachine = new VendingMachine();
    this.#authorization = new Authorization();
    this.#userRenderList = {
      '#/user-info': new UserInfoPage(this.#authorization, this.snackBar),
      '#/manage': new ManageProductTab(this.#vendingMachine, this.snackBar),
      '#/charge': new AddChangeTab(this.#vendingMachine, this.snackBar),
      '#/purchase': new PurchaseProductTab(this.#vendingMachine, this.snackBar),
    };
    this.#nonUserRenderList = {
      '#/login': new LoginPage(this.#authorization, this.snackBar),
      '#/register': new RegisterPage(this.#authorization, this.snackBar),
      '#/purchase': new PurchaseProductTab(this.#vendingMachine, this.snackBar),
    };
    this.#headerContainer = selectDom('header');
    this.#appContainer = selectDom('#app');

    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
  }

  #render = () => {
    if (this.#authorization.isLoggedIn) {
      this.#renderUser();
      return;
    }
    this.#renderNonUser();
  };

  #renderUser() {
    const path = window.location.hash || '#/manage';
    this.#renderNav(path);
    selectDom('#login-link-button', this.#appContainer)?.remove();
    this.#updateUserButton();

    this.#renderTab(this.#userRenderList, path);
  }

  #renderNonUser() {
    const path = window.location.hash || '#/purchase';
    selectDom('#tab-menu-navigation')?.remove();
    selectDom('#user-button', this.#appContainer)?.remove();
    if (!selectDom('#login-link-button', this.#appContainer)) {
      this.#appContainer.insertAdjacentHTML('afterbegin', loginLinkButtonTemplate);
    }
    this.#renderTab(this.#nonUserRenderList, path);
  }

  #renderNav(path) {
    this.#tabMenuNavigation = selectDom('#tab-menu-navigation');

    if (!this.#tabMenuNavigation) {
      this.#headerContainer.insertAdjacentHTML('beforeend', navigationTemplate);
      this.#tabMenuNavigation = selectDom('#tab-menu-navigation', this.#headerContainer);
      this.#tabMenuNavigation.addEventListener('click', this.#handleTabMenuChange);
    }

    const previousMenuButton = selectDom('.current', this.#tabMenuNavigation);
    previousMenuButton?.classList.remove('current');

    const currentMenuButton = selectDom(`[href="${path}"]`, this.#tabMenuNavigation);
    currentMenuButton?.classList.add('current');
  }

  #renderTab(routeList, path) {
    if (!routeList[path]) {
      const notFoundContainer = createMainElement(notFoundTabTemplate);
      this.#appContainer.replaceChild(notFoundContainer, selectDom('main'));
      return;
    }

    this.#appContainer.replaceChild(routeList[path].tabElements, selectDom('main'));
  }

  #updateUserButton() {
    this.#appContainer.insertAdjacentHTML(
      'afterbegin',
      userButtonTemplate(this.#authorization.name)
    );
    selectDom('#user-button').addEventListener('click', this.#renderSelectBox);
    selectDom('#user-button-select-box')?.remove();
  }

  #renderSelectBox = ({ target }) => {
    target.insertAdjacentHTML('afterend', userButtonSelectBoxTemplate);
    selectDom('#logout-button').addEventListener('click', this.#handleLogout);
    target.removeEventListener('click', this.#renderSelectBox);
    target.addEventListener('click', this.#closeSelectBox);
  };

  #closeSelectBox = ({ target }) => {
    selectDom('#user-button-select-box').remove();
    target.removeEventListener('click', this.#closeSelectBox);
    target.addEventListener('click', this.#renderSelectBox);
  };

  #handleLogout = () => {
    this.#authorization.logout();
    window.location.href = '/';
  };

  #handleTabMenuChange = (e) => {
    e.preventDefault();

    const { hash: newHash } = e.target;
    const previousHash = window.location.hash;

    if (
      (!Object.keys(this.#userRenderList).includes(newHash) &&
        !Object.keys(this.#nonUserRenderList).includes(newHash)) ||
      newHash === previousHash
    ) {
      return;
    }

    window.history.pushState({}, null, newHash);
    this.#render();
  };
}

new App();
