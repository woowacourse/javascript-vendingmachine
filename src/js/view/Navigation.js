import { createElementByTemplate, selectDom } from '../utils/dom';

const template = `
      <nav class="user-navigation">
        <button>로그인</button>
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

  constructor() {
    this.#navContainer = createElementByTemplate('header', template);
    this.#tabMenuNav = selectDom('#tab-menu-navigation', this.#navContainer);
    this.#tabMenuNav.addEventListener('click', this.#handleTabMenuChange);
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
