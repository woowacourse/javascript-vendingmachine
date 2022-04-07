import AuthStore from '../../domains/stores/AuthStore';
import { AUTH_ACTION, createAction } from '../../domains/actions';
import { getUser, isLoggedIn, logout } from '../../domains/Auth';

import CustomElement from '../../abstracts/CustomElement';
import { $, hideElement, showElement } from '../../utils';

class AuthMenu extends CustomElement {
  async connectedCallback() {
    await this.render();
    this.setEvent();
    AuthStore.instance.subscribe(this);
  }

  async render() {
    let userNameFirstChar = '';

    if (isLoggedIn()) {
      const user = await getUser();
      userNameFirstChar = user.name?.charAt(0);
    }

    this.insertAdjacentHTML('beforeend', this.template(userNameFirstChar));
  }

  template(userNameFirstChar) {
    const isAdministrator = userNameFirstChar !== '';
    const isLoginButtonHidden = isAdministrator ? 'hidden' : '';
    const isUserButtonHidden = isAdministrator ? '' : 'hidden';

    return `
      <a href="#!login">
        <button class="login-button ${isLoginButtonHidden}">로그인</button>
      </a>
      <button class="user-button ${isUserButtonHidden}">${userNameFirstChar}</button>
      <div class="user-menu-select-box hidden">
        <a href="#!user-info-modify" class="user-info-modify-button">
          <button>🛠 회원 정보 수정</button>
        </a>
        <button class="logout-button">👋🏻 로그아웃</button>
      </div>
    `;
  }

  setEvent() {
    this.addEventListener('click', this.handleAuthMenuClick);
  }

  handleAuthMenuClick = (event) => {
    const { target } = event;

    if (target === $('.user-button')) {
      this.handleUserButtonClick();
      return;
    }

    if (target === $('.logout-button')) {
      this.handleLogoutButtonClick();
    }

    hideElement($('.user-menu-select-box'));
  };

  handleUserButtonClick = () => {
    const $userMenuSelectBox = $('.user-menu-select-box');

    if ($userMenuSelectBox.classList.contains('hidden')) {
      showElement($userMenuSelectBox);

      return;
    }

    hideElement($userMenuSelectBox);
  };

  handleLogoutButtonClick = () => {
    logout();

    AuthStore.instance.dispatch(createAction(AUTH_ACTION.LOGOUT));
  };

  async rerender(isAdministrator) {
    const $loginButton = $('.login-button');
    const $userButton = $('.user-button');

    if (isAdministrator) {
      hideElement($loginButton);

      const user = await getUser();
      $userButton.textContent = user.name.charAt(0);
      showElement($userButton);

      return;
    }

    showElement($loginButton);
    hideElement($userButton);
  }
}

customElements.define('auth-menu', AuthMenu);

export default AuthMenu;
