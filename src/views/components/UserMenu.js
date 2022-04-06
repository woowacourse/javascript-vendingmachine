import Component from '../../core/Component';
import './Link';

export default class UserMenu extends Component {
  template() {
    if (true) {
      return `
        <a-link href="/login" class="login-button styled-button">로그인</a-link>
      `;
    }

    return `
      <a-link class="thumbnail styled-button">우</a-link>
    `;
  }
}

customElements.define('user-menu', UserMenu);
