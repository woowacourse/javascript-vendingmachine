import VendingMachine from '../domain/VendingMachine';
import PurchaseProductTab from './PurchaseProductTab';
import AddChangeTab from './AddChangeTab';
import ManageProductTab from './ManageProductTab';
import { createDivElement, createMainElement, selectDom } from '../utils/dom';
import { TEMPLATE } from './template';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import Auth from '../domain/Auth';

export default class Router {
  #vendingMachine;
  #renderList;
  #app;
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
    };

    this.#adminHeaderContainer = createDivElement(TEMPLATE.ADMIN_HEADER);

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
  }

  //리팩토링 필수
  #render = () => {
    this.#app.replaceChildren();

    if (window.location.hash === '#/register' || window.location.hash === '#/login') {
      this.#app.insertAdjacentElement(
        'beforeend',
        this.#renderList[window.location.hash].template
      );
      return;
    }

    this.#app.insertAdjacentElement('beforeend', this.#adminHeaderContainer);

    if (this.#isAdmin()) {
      const id = localStorage.getItem('userId');

      Auth.getUserInfo(id).then(({ name }) => {
        this.#nickname.textContent = name[0];
      });
    }

    this.#userProfile.classList.toggle('hide', this.#isAdmin());
    this.#adminProfile.classList.toggle('hide', !this.#isAdmin());

    let path = window.location.hash || '#/manage';
    this.#tabMenuNavigation.classList.remove('hide');
    this.#updateCurrentTabMenu(path);

    if (!localStorage.getItem('accessToken')) {
      path = '#/purchase';
      this.#tabMenuNavigation.classList.add('hide');
    }

    this.#main.replaceChildren();

    if (!this.#renderList[path]) {
      const notFoundContainer = createMainElement(TEMPLATE.NOT_FOUND);
      this.#main.insertAdjacentElement('beforeend', notFoundContainer);
      return;
    }

    this.#main.insertAdjacentElement('beforeend', this.#renderList[path].tabElements);
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
  };

  #isAdmin() {
    return localStorage.getItem('accessToken');
  }
}
