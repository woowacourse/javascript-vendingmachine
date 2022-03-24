import { templateA, templateB, templateC } from './template';

export default class Navigation {
  #tabMenuNavigation;
  #main;
  #renderList;

  constructor() {
    this.#tabMenuNavigation = document.querySelector('#tab-menu-navigation');
    this.#main = document.querySelector('main');
    this.#renderList = {
      '#/manage': templateA,
      '#/charge': templateB,
      '#/purchase': templateC,
    };

    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#render);
    this.#tabMenuNavigation.addEventListener(
      'click',
      this.#handleTabMenuChange
    );
  }

  #render = () => {
    const path = window.location.hash || '#/manage';

    this.#updateCurrentTabMenu(path);

    this.#main.replaceChildren();
    this.#main.insertAdjacentHTML('beforeend', this.#renderList[path]);
  };

  #updateCurrentTabMenu(path) {
    const previousMenuButton =
      this.#tabMenuNavigation.querySelector('.current');
    previousMenuButton?.classList.remove('current');

    const currentMenuButton = this.#tabMenuNavigation.querySelector(
      `[href="${path}"]`
    );
    currentMenuButton.classList.add('current');
  }

  #handleTabMenuChange = (e) => {
    const { hash: newHash } = e.target;
    const previousHash = window.location.hash;

    if (!Object.keys(this.#renderList).includes(newHash)) return;

    if (newHash === previousHash) return;

    e.preventDefault();

    window.history.pushState({}, null, newHash);
    this.#render();
  };
}
