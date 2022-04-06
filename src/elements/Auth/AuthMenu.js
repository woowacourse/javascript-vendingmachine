import AuthStore from '../../domains/stores/AuthStore';
import { getUser, isLoggedIn } from '../../domains/Auth';

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
    return `
      <a href="/#!login">
        <button class="login-button">로그인</button>
      </a>
      <button class="user-button" hidden>${userNameFirstChar}</button>
    `;
  }

  setEvent() {
    $('.user-button').addEventListener('click', this.handleUserButtonClick);
  }

  handleUserButtonClick = () => {};

  rerender(isAdministrator) {
    if (isAdministrator) {
      $('.login-button').setAttribute('hidden', true);
      $('.user-button').removeAttribute('hidden');

      return;
    }

    $('.login-button').removeAttribute('hidden');
    $('.user-button').setAttribute('hidden', true);
  }
}

customElements.define('auth-menu', AuthMenu);

export default AuthMenu;
