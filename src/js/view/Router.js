import VendingMachine from '../domain/vendingMachine/VendingMachine';
import Auth from '../domain/auth/Auth';

import PurchaseProductTab from './vendingMachine/PurchaseProductTab';
import AddChangeTab from './vendingMachine/AddChangeTab';
import ManageProductTab from './vendingMachine/ManageProductTab';
import LoginView from './auth/LoginView';
import RegisterView from './auth/RegisterView';
import ModifyMyInfoView from './auth/ModifyMyInfoView';

import SnackBar from './SnackBar';
import { TEMPLATE } from './template';

import { createDivElement, createMainElement, selectDom } from '../utils/dom';
import { SNACKBAR_MESSAGE, STORAGE_KEY } from '../constants';

export default class Router {
  #vendingMachine;
  #renderList;
  #app;
  #body;
  #tabMenuNavigation;
  #adminHeaderContainer;
  #main;
  #userProfile;
  #adminProfile;
  #logoutTabMenu;
  #nickname;

  constructor() {
    //멤버변수 생성
    this.#vendingMachine = new VendingMachine();
    this.#renderList = {
      '#/manage': new ManageProductTab(this.#vendingMachine),
      '#/charge': new AddChangeTab(this.#vendingMachine),
      '#/purchase': new PurchaseProductTab(this.#vendingMachine),
      '#/login': new LoginView(),
      '#/register': new RegisterView(),
      '#/modify': new ModifyMyInfoView(),
    };

    this.#adminHeaderContainer = createDivElement(TEMPLATE.ADMIN_HEADER);
    this.#body = selectDom('body');
    this.#app = selectDom('#app');
    this.#main = selectDom('main', this.#adminHeaderContainer);
    this.#tabMenuNavigation = selectDom(
      '#tab-menu-navigation',
      this.#adminHeaderContainer
    );
    this.#userProfile = selectDom('#user', this.#adminHeaderContainer);
    this.#adminProfile = selectDom('#admin', this.#adminHeaderContainer);
    this.#logoutTabMenu = selectDom('#logout-tab-menu', this.#adminHeaderContainer);
    this.#nickname = selectDom('#nickname', this.#adminHeaderContainer);

    //이벤트 바인딩
    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
    this.#adminProfile.addEventListener('click', this.#handleAdminDetailMenu);
    this.#tabMenuNavigation.addEventListener('click', this.#handleTabMenuChange);
    this.#logoutTabMenu.addEventListener('click', this.#handleLogout);

    //초기 화면 렌더링
    this.#body.insertAdjacentHTML('beforeend', TEMPLATE.SNACK_BAR);
  }

  #render = () => {
    this.#app.replaceChildren();

    let path = window.location.hash || '#/manage';
    if (path === '#/register' || (path === '#/login') | (path === '#/modify')) {
      this.#app.insertAdjacentElement('beforeend', this.#renderList[path].template);
      return;
    }

    this.#renderAdminHeader(path);

    if (!localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
      path = '#/purchase';
      this.#tabMenuNavigation.classList.add('hide');
    }
    this.#renderMain(path);
  };

  #renderAdminHeader(path) {
    this.#app.insertAdjacentElement('beforeend', this.#adminHeaderContainer);
    this.#tabMenuNavigation.classList.remove('hide');
    this.#updateCurrentTabMenu(path);
    this.#handleProfile();
  }

  #renderMain(path) {
    this.#main.replaceChildren();

    if (!this.#renderList[path]) {
      const notFoundContainer = createMainElement(TEMPLATE.NOT_FOUND);
      this.#main.insertAdjacentElement('beforeend', notFoundContainer);
      return;
    }
    this.#main.insertAdjacentElement('beforeend', this.#renderList[path].tabElements);
  }

  #handleProfile() {
    this.#userProfile.classList.toggle('hide', this.#isAdmin());
    this.#adminProfile.classList.toggle('hide', !this.#isAdmin());
    this.#handleProfileThumbnail();
  }

  #handleProfileThumbnail() {
    if (this.#isAdmin()) {
      const id = localStorage.getItem(STORAGE_KEY.USER_ID);

      Auth.getUserInfo(id).then(({ name }) => {
        this.#nickname.textContent = name[0];
      });
    }
  }

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

    if (!Object.keys(this.#renderList).includes(newHash) || newHash === previousHash)
      return;

    window.history.pushState({}, null, newHash);
    this.#render();
  };

  #handleAdminDetailMenu = () => {
    const $adminDetail = selectDom('.admin-detail', this.#app);
    $adminDetail.classList.toggle('hide');
  };

  #handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEY.USER_ID);
    SnackBar.dispatch(SNACKBAR_MESSAGE.LOGOUT_SUCCESS);
  };

  #isAdmin() {
    return localStorage.getItem('accessToken');
  }
}
