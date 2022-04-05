import template from './template';

import { $ } from '../utils';
import { logout } from '../utils/auth';

import User from '../state/User';

class HeaderView {
  $container = $('header');
  $title = $('.title', this.$container);
  $goMainButton = $('#go-main-button', this.$container);
  $userArea = $('.user-area', this.$container);
  $loginButton = $('#login-button', this.$userArea);
  $nav = $('.nav', this.$container);

  constructor() {
    this.$userArea.addEventListener('click', this.onClickUserArea);
  }

  updateOnPageChange(page) {
    this.updateTitle(page);
    this.updateMenuButton(page);
  }

  onClickUserArea(event) {
    if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'LI') return;
    if (event.target.name === 'thumbnail-button') {
      $('#member-menu', this.$userArea).classList.toggle('hidden');
    }
    if (event.target.id === 'logout-button') {
      logout();
    }
  }

  updateTitle(page) {
    switch (page) {
      case 'login':
        this.$title.innerText = '로그인';
        break;
      case 'signUp':
        this.$title.innerText = '회원가입';
        break;
      case 'updateMyInfo':
        this.$title.innerText = '회원 정보 수정';
        break;
      default:
        this.$title.innerText = '🍿 자판기 🍿';
    }
  }

  updateMenuButton(page) {
    this.updateUserArea();

    if (User.isMember && page !== 'updateMyInfo') {
      this.showNavigationMenu();
      this.updateNavigationSelectedMenu(page);
    } else {
      this.hideNavigationMenu();
    }

    switch (page) {
      case 'login':
      case 'signUp':
      case 'updateMyInfo':
        this.showGoMainButton();
        this.hideUserArea();
        break;
      default:
        this.hideGoMainButton();
        this.showUserArea();
    }
  }

  updateUserArea() {
    if (User.isMember) {
      this.$userArea.innerHTML = template.userAreaContentForMember(User.name);
    } else {
      this.$userArea.innerHTML = template.userAreaContentForNonMember;
    }
  }

  showUserArea() {
    if (this.$userArea.classList.contains('hidden')) {
      this.$userArea.classList.remove('hidden');
    }
  }

  hideUserArea() {
    if (!this.$userArea.classList.contains('hidden')) {
      this.$userArea.classList.add('hidden');
    }
  }

  showGoMainButton() {
    if (this.$goMainButton.classList.contains('hidden')) {
      this.$goMainButton.classList.remove('hidden');
    }
  }

  hideGoMainButton() {
    if (!this.$goMainButton.classList.contains('hidden')) {
      this.$goMainButton.classList.add('hidden');
    }
  }

  showNavigationMenu() {
    if (this.$nav.classList.contains('hidden')) {
      this.$nav.classList.remove('hidden');
    }
  }

  hideNavigationMenu() {
    if (!this.$nav.classList.contains('hidden')) {
      this.$nav.classList.add('hidden');
    }
  }

  updateNavigationSelectedMenu(page) {
    $('.selected', this.$nav)?.classList.remove('selected');
    $(`.nav-menu[data-page*="${page}"]`)?.classList.add('selected');
  }
}

export default new HeaderView();
