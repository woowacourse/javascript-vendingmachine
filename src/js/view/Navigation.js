import { createElementByTemplate, selectDom } from '../utils/dom';

const template = `
    <nav class="user-navigation"> 
      <a type="button" class="tab-menu-button" id="to-login-anchor" href="#/login">
        로그인 
        </a>
    <button type="button" class="user-navigation-profile--button hide">
        우
  </button>
  <ul class="user-navigation--ul hide">
    <li type="button" class="user-navigation--li">
      <a href="#/myprofile" id="user-navigation-profile">Profile</a>
    </li>
    <li type="button" class="user-navigation--li">
      Logout
    </li>
  </ul>
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
  #toLoginButton;
  #profileButton;
  #profileList;

  constructor() {
    this.#navContainer = createElementByTemplate('header', template);
    this.#tabMenuNav = selectDom('#tab-menu-navigation', this.#navContainer);
    this.#toLoginButton = selectDom('#to-login-anchor', this.#navContainer);
    this.#profileButton = selectDom(
      '.user-navigation-profile--button',
      this.#navContainer
    );
    this.#profileList = selectDom('.user-navigation--ul', this.#navContainer);
    this.renderMenuNavigation();

    this.#profileButton.addEventListener('click', this.#showList);
    this.#profileList.addEventListener('click', this.#handleProfileList);
    this.#toLoginButton.addEventListener('click', this.#handleTabMenuChange);
    this.#tabMenuNav.addEventListener('click', this.#handleTabMenuChange);
  }

  renderMenuNavigation(isLogined, name) {
    if (!isLogined) {
      this.#tabMenuNav.classList.add('hide');
      this.#profileButton.classList.add('hide');
      this.#toLoginButton.classList.remove('hide');
    }
    if (isLogined) {
      this.#tabMenuNav.classList.remove('hide');
      this.#profileButton.classList.remove('hide');
      this.#toLoginButton.classList.add('hide');
      this.#profileButton.textContent = name.charAt(0);
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

  #showList = () => {
    this.#profileList.classList.remove('hide');
    selectDom('body').addEventListener('click', this.#removeList);
  };

  #removeList = (e) => {
    if (e.target !== this.#profileList && e.target !== this.#profileButton) {
      this.#profileList.classList.add('hide');
    }
  };

  #handleProfileList = (e) => {
    if (e.target.id === 'user-navigation-profile') {
      this.#handleTabMenuChange(e);
    }
  };

  get element() {
    return this.#navContainer;
  }
}
