import VendingMachine from '../domain/VendingMachine';
import PurchaseProductTab from './PurchaseProductTab';
import AddChangeTab from './AddChangeTab';
import ManageProductTab from './ManageProductTab';
import { createMainElement, selectDom } from '../utils/dom';
import { TEMPLATE } from './template';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

export default class Router {
  #vendingMachine;
  #renderList;
  #app;
  #body;
  #tabMenuNavigation;

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
    this.#app = selectDom('#app');

    //이벤트 바인딩
    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
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

    this.#app.insertAdjacentHTML('beforeend', TEMPLATE.ADMIN_HEADER);

    this.#tabMenuNavigation = selectDom('#tab-menu-navigation');
    this.#tabMenuNavigation.addEventListener('click', this.#handleTabMenuChange);

    let path = window.location.hash || '#/manage';
    this.#tabMenuNavigation.classList.remove('hide');
    this.#updateCurrentTabMenu(path);

    if (!localStorage.getItem('accessToken')) {
      path = '#/purchase';
      this.#tabMenuNavigation.classList.add('hide');
    }

    const main = selectDom('main');

    if (!this.#renderList[path]) {
      const notFoundContainer = createMainElement(TEMPLATE.NOT_FOUND);
      this.#app.replaceChild(notFoundContainer, main);
      return;
    }

    this.#app.replaceChild(this.#renderList[path].tabElements, main);
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
}
