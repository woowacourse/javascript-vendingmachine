import VendingMachine from './domain/VendingMachine';
import Authorization from './domain/Authorization';

import {
  ChargeTab,
  LoginPage,
  ProductTab,
  PurchaseTab,
  RegisterPage,
  UserInfoPage,
} from './view';

import { createMainElement, selectDom } from './utils/dom';

import {
  loginLinkButtonTemplate,
  navigationTemplate,
  notFoundTabTemplate,
  userButtonSelectBoxTemplate,
  userButtonTemplate,
} from './view/generalTemplate';

import Snackbar from './view/Snackbar';
import { DEFAULT_ROUTE } from './constants';

class App {
  #vendingMachine;
  #authorization;
  #userButtonContainer;
  #userRenderList;
  #nonUserRenderList;
  #headerContainer;
  #appContainer;
  #tabMenuNavigation;

  constructor() {
    this.snackBar = new Snackbar();
    this.#vendingMachine = new VendingMachine();
    this.#authorization = new Authorization();
    this.#appContainer = selectDom('#app');
    this.#userButtonContainer = selectDom('.user-button-container');
    this.#headerContainer = selectDom('header');

    this.#initRoutes();

    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);

    this.#userButtonContainer.addEventListener(
      'click',
      this.#handleUserButtonContainerClick
    );
  }

  #initRoutes() {
    this.#userRenderList = {
      '#/user-info': new UserInfoPage(this.#authorization, this.snackBar),
      '#/product': new ProductTab(this.#vendingMachine, this.snackBar),
      '#/charge': new ChargeTab(this.#vendingMachine, this.snackBar),
      '#/purchase': new PurchaseTab(this.#vendingMachine, this.snackBar),
    };
    this.#nonUserRenderList = {
      '#/login': new LoginPage(this.#authorization, this.snackBar),
      '#/register': new RegisterPage(this.#authorization, this.snackBar),
      '#/purchase': new PurchaseTab(this.#vendingMachine, this.snackBar),
    };
  }

  #render = () => {
    if (this.#authorization.isLoggedIn) {
      this.#renderUser();
      return;
    }
    this.#renderNonUser();
  };

  #renderUser() {
    const path = window.location.hash || DEFAULT_ROUTE.USER;
    this.#renderNav(path);
    selectDom('#login-link-button', this.#userButtonContainer)?.remove();

    this.#renderTab(this.#userRenderList, path);

    selectDom('#user-button-select-box')?.remove();

    if (selectDom('#user-button', this.#userButtonContainer)) return;

    this.#userButtonContainer.insertAdjacentHTML(
      'afterbegin',
      userButtonTemplate(this.#authorization.name)
    );
  }

  #renderNonUser() {
    const path = window.location.hash || DEFAULT_ROUTE.NON_USER;
    selectDom('#tab-menu-navigation')?.remove();
    selectDom('#user-button', this.#userButtonContainer)?.remove();
    if (!selectDom('#login-link-button', this.#userButtonContainer)) {
      this.#userButtonContainer.insertAdjacentHTML('afterbegin', loginLinkButtonTemplate);
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

  #handleUserButtonContainerClick = ({ target }) => {
    if (target.id === 'user-button') this.#handleSelectBoxToggle(target);
    if (target.id === 'logout-button') this.#handleLogout();
  };

  #handleSelectBoxToggle = (target) => {
    const selectBox = selectDom('#user-button-select-box');

    if (selectBox) {
      selectBox?.remove();
      return;
    }

    target.insertAdjacentHTML('afterend', userButtonSelectBoxTemplate);
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
