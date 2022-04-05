import CustomElement from '../../abstracts/CustomElement';

class UserManager extends CustomElement {
  template() {
    return `
      <a href="#!login"><button class="login-button">로그인</button></a>
    `;
  }
}

customElements.define('user-manager', UserManager);
