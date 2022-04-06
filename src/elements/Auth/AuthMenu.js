import AuthStore from '../../domains/stores/AuthStore';
import { AUTH_ACTION, createAction } from '../../domains/actions';
import { getUser, isLoggedIn, logout } from '../../domains/Auth';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';

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
      userNameFirstChar = user.name.charAt(0);
    }

    this.insertAdjacentHTML('beforeend', this.template(userNameFirstChar));
  }

  template(userNameFirstChar) {
    const isAdministrator = userNameFirstChar !== '';
    const isLoginButtonHidden = isAdministrator ? 'hidden' : '';
    const isUserButtonHidden = isAdministrator ? '' : 'hidden';

    return `
      <a href="#!login">
        <button class="login-button" ${isLoginButtonHidden}>로그인</button>
      </a>
      <button class="user-button" ${isUserButtonHidden}>${userNameFirstChar}</button>
      <div class="user-menu-select-box">
        <a href="#!user-info-modify">
          <button>회원 정보 수정</button>
        </a>
        <button class="logout-button">로그아웃</button>
      </div>
    `;
  }

  setEvent() {
    $('.user-button').addEventListener('click', this.handleUserButtonClick);
    $('.logout-button').addEventListener('click', this.handleLogoutButtonClick);
  }

  handleUserButtonClick = () => {};

  handleLogoutButtonClick = () => {
    logout();

    AuthStore.instance.dispatch(createAction(AUTH_ACTION.LOGOUT));
  };

  async rerender(isAdministrator) {
    const $loginButton = $('.login-button');
    const $userButton = $('.user-button');

    if (isAdministrator) {
      $loginButton.setAttribute('hidden', true);

      const user = await getUser();
      $userButton.textContent = user.name.charAt(0);
      $userButton.removeAttribute('hidden');

      return;
    }

    $loginButton.removeAttribute('hidden');
    $userButton.setAttribute('hidden', true);
  }
}

customElements.define('auth-menu', AuthMenu);

export default AuthMenu;
