import { createElementByTemplate, selectDom } from '../utils/dom';

const template = `
    <nav class="user-navigation"> 
      <a type="button" class="tab-menu-button" href="#/login">
        로그인
        </a>
    </nav>
    <h1 id="app-title">🍿 자판기 🍿</h1>
    <nav id="tab-menu-navigation">
        <a type="button" id="manage-tab-menu" class="tab-menu-button" href="#/manage">
          상품 관리
        </a>
        <a type="button" id="charge-tab-menu" class="tab-menu-button" href="#/charge">
          잔돈 충전
        </a>
        <a type="button" id="purchase-tab-menu" class="tab-menu-button" href="#/purchase">
          상품 구매
        </a>
    </nav>
    `;

export default class Navigation {
  #navContainer;
  #tabMenuNav;
  #user;

  constructor(user) {
    this.#user = user;
    this.#navContainer = createElementByTemplate('header', template);
    this.#tabMenuNav = selectDom('#tab-menu-navigation', this.#navContainer);
    this.#renderMenuNavigation();

    this.#tabMenuNav.addEventListener('click', this.#handleTabMenuChange);
  }

  #renderMenuNavigation() {
    if (!this.#user.isLoggined) {
      this.#tabMenuNav.classList.add('hide');
    }
    if (this.#user.isLoggined) {
      this.#tabMenuNav.classList.remove('hide');
    }
  }

  #handleTabMenuChange = (e) => {
    e.preventDefault();
    const { hash: newHash } = e.target;
    const previousHash = window.location.hash;

    if (newHash === previousHash) {
      return;
    }
    const tabChange = new CustomEvent('tabChange', {
      detail: {
        newHash,
      },
    });
    window.dispatchEvent(tabChange);
  };

  get element() {
    return this.#navContainer;
  }
}
