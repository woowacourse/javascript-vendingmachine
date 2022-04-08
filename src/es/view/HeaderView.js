import template from './template';

import { $ } from '../utils';
import { logout } from '../utils/auth';

import User from '../state/User';

const titleText = {
  specifiedPage: {
    login: '로그인',
    signUp: '회원가입',
    updateMyInfo: '회원 정보 수정',
  },
  default: '🍿 자판기 🍿',
};

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
    if (event.target.name === 'thumbnail-button') {
      $('#member-menu', this.$userArea).classList.toggle('hidden');
    }
    if (event.target.id === 'logout-button') {
      logout();
    }
  }

  updateTitle(page) {
    const specifiedPageNames = Object.keys(titleText.specifiedPage);
    if (specifiedPageNames.includes(page)) {
      this.$title.innerText = titleText.specifiedPage[page];
      return;
    }
    this.$title.innerText = titleText.default;
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
