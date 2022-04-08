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
      this.setNavigationMenu(true);
      this.updateNavigationSelectedMenu(page);
    } else {
      this.setNavigationMenu(false);
    }

    switch (page) {
      case 'login':
      case 'signUp':
      case 'updateMyInfo':
        this.setGoMainButtonVisibility(true);
        this.setUserAreaVisibility(false);
        break;
      default:
        this.setGoMainButtonVisibility(false);
        this.setUserAreaVisibility(true);
    }
  }

  updateUserArea() {
    if (User.isMember) {
      this.$userArea.innerHTML = template.userAreaContentForMember(User.name);
    } else {
      this.$userArea.innerHTML = template.userAreaContentForNonMember;
    }
  }

  setUserAreaVisibility(visible) {
    const userAreaClassList = this.$userArea.classList;
    if (visible && userAreaClassList.contains('hidden')) userAreaClassList.remove('hidden');
    if (!visible && !userAreaClassList.contains('hidden')) userAreaClassList.add('hidden');
  }

  setGoMainButtonVisibility(visible) {
    const goMainButtonClassList = this.$goMainButton.classList;
    if (visible && goMainButtonClassList.contains('hidden')) goMainButtonClassList.remove('hidden');
    if (!visible && !goMainButtonClassList.contains('hidden')) goMainButtonClassList.add('hidden');
  }

  setNavigationMenu(visible) {
    const navClassList = this.$nav.classList;
    if (visible && navClassList.contains('hidden')) navClassList.remove('hidden');
    if (!visible && !navClassList.contains('hidden')) navClassList.add('hidden');
  }

  updateNavigationSelectedMenu(page) {
    $('.selected', this.$nav)?.classList.remove('selected');
    $(`.nav-menu[data-page*="${page}"]`)?.classList.add('selected');
  }
}

export default new HeaderView();
