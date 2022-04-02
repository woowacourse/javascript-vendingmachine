import { $ } from '../utils';

export default class HeaderView {
  $container = $('header');
  $title = $('.title', this.$container);
  $goMainButton = $('#go-main-button', this.$container);
  $loginButton = $('#login-button', this.$container);
  $nav = $('.nav', this.$container);

  render(state) {
    this.updateTitle(state);
    this.updateMenuButton(state);
  }

  updateTitle({ currentPage }) {
    switch (currentPage) {
      case 'login':
        this.$title.innerText = '로그인';
        break;
      case 'signUp':
        this.$title.innerText = '회원가입';
        break;
      default:
        this.$title.innerText = '🍿 자판기 🍿';
    }
  }

  updateMenuButton({ currentPage }) {
    switch (currentPage) {
      case 'login':
      case 'signUp':
        this.hideLoginButton();
        this.showGoMainButton();
        this.hideNavigationMenu();
        break;
      default:
        this.showLoginButton();
        this.hideGoMainButton();
        this.showNavigationMenu();
        this.updateNavigationSelectedMenu(currentPage);
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

  showLoginButton() {
    if (this.$loginButton.classList.contains('hidden')) {
      this.$loginButton.classList.remove('hidden');
    }
  }

  hideLoginButton() {
    if (!this.$loginButton.classList.contains('hidden')) {
      this.$loginButton.classList.add('hidden');
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

  updateNavigationSelectedMenu(currentPage) {
    $('.selected', this.$nav).classList.remove('selected');
    $(`.nav-menu[data-page*="${currentPage}"]`).classList.add('selected');
  }
}
