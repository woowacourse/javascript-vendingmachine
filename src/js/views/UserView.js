import { $ } from '../utils/dom.js';
import { requestUserInfo } from '../utils/api.js';

export default class UserView {
  constructor() {
    this.$loginContainer = $('#login-container');
    this.$selectBox = $('.select-box');
    this.$login = $('.login');
    this.$menuCategory = $('#menu-category');
    this.$thumbnail = $('.thumbnail');

    this.$loginContainer.addEventListener('click', this.#onClickLoginContainer.bind(this));

    this.confirmLogin();
  }

  async confirmLogin() {
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    if (userInfo) {
      const response = await requestUserInfo(userInfo.id, userInfo.accessToken);
      // eslint-disable-next-line prefer-destructuring
      this.$thumbnail.textContent = response.name[0];
      this.toggleHide();
    }
  }

  toggleHide() {
    this.$login.classList.toggle('hide');
    this.$menuCategory.classList.toggle('hide');
    this.$thumbnail.classList.toggle('hide');
  }

  #onClickLoginContainer(e) {
    switch (e.target.name) {
      case 'login':
        document.location.href = './login.html';
        break;
      case 'thumbnail':
        this.$selectBox.classList.toggle('hide');
        break;
      case 'edit':
        document.location.href = './profile.html';
        break;
      case 'logout':
        this.$selectBox.classList.add('hide');
        sessionStorage.removeItem('user');
        this.toggleHide();
        break;
      default:
    }
  }
}
