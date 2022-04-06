import { $ } from '../utils/dom.js';
import { requestUserInfo } from '../api.js';

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
    console.log('confirm login');
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    if (userInfo) {
      const response = await requestUserInfo(userInfo.id, userInfo.accessToken);
      if (!response.status) {
        alert(response.content);
        return;
      }
      // eslint-disable-next-line prefer-destructuring
      this.$thumbnail.textContent = response.content.name[0];
      this.toggle();
    }
  }

  toggle() {
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
        this.$selectBox.classList.toggle('hide');
        document.location.href = './profile.html';
        break;
      case 'logout':
        this.$selectBox.classList.toggle('hide');
        sessionStorage.removeItem('user');
        this.toggle();
        break;
      default:
    }
  }
}
