import { createElementByTemplate, selectDom } from '../utils/dom';
import { dispatchTabChangeEvent, emitEvent } from '../utils/event';
import { navTemplate } from './template';

export default class Navigation {
  #navContainer;
  #tabMenuNav;
  #toLoginButton;
  #profileButton;
  #profileList;

  constructor() {
    this.#navContainer = createElementByTemplate('header', navTemplate);
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
    dispatchTabChangeEvent(newHash);
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
    if (e.target.id === 'logout') {
      emitEvent(selectDom('body'), 'logout');
    }
  };

  get element() {
    return this.#navContainer;
  }
}
