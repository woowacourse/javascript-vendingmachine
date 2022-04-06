import { createElementByTemplate, selectDom } from '../utils/dom';
import { notFoundTemplate } from './template';

export default class Router {
  #renderList;
  #userRenderList;
  #privateRenderList;
  #user;

  constructor(user) {
    this.#user = user;
    this.#privateRenderList = {};
    this.#userRenderList = {};
    this.#renderList = {};
  }

  bindEvents() {
    window.addEventListener('popstate', this.#render);
    window.addEventListener('DOMContentLoaded', this.#initUserState);
    window.addEventListener('tabChange', this.#handleTabMenuChange);
  }

  addPrivateRenderList(key, view) {
    this.#privateRenderList[key] = view;
    this.addRenderList(key, view);
  }

  addRenderList(key, view) {
    this.#renderList[key] = view;
  }

  addUserRenderList(key, view) {
    this.#userRenderList[key] = view;
    this.addRenderList(key, view);
  }

  // eslint-disable-next-line max-lines-per-function
  #render = () => {
    const path = window.location.hash || '#/purchase';

    if (!this.#renderList[path]) {
      const notFoundContainer = createElementByTemplate('div', notFoundTemplate);
      notFoundContainer.id = 'app';
      selectDom('body').replaceChild(notFoundContainer, selectDom('#app'));
      return;
    }

    if (this.#privateRenderList[path] && !this.#user.isLogined) {
      window.history.pushState({}, null, '#/login');
      this.#render();
      alert('로그인이 필요합니다.');
      return;
    }

    if (this.#userRenderList[path] && this.#user.isLogined) {
      window.history.pushState({}, null, '/');
      this.#render();
      alert('이미 로그인한 상태입니다.');
      return;
    }

    selectDom('body').replaceChild(this.#renderList[path].element, selectDom('#app'));
    this.#updateCurrentTabMenu(path);
  };

  #updateCurrentTabMenu(path) {
    if (!selectDom('#tab-menu-navigation')) return;
    const previousMenuButton = selectDom('.current', selectDom('#tab-menu-navigation'));
    previousMenuButton?.classList.remove('current');

    const currentMenuButton = selectDom(
      `[href="${path}"]`,
      selectDom('#tab-menu-navigation')
    );

    currentMenuButton?.classList.add('current');
  }

  #initUserState = async () => {
    await this.#user.initLoginStatus();
    this.#render();
  };

  #handleTabMenuChange = (e) => {
    e.preventDefault();

    window.history.pushState({}, null, e.detail.newHash);
    this.#render();
  };
}
