import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Router from '../router';

@customElement('login-header')
class LoginHeader extends Component {
  template(): string {
    return `
    <button type="button" class="btn">로그인</button>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickLoginBtn);
  }

  onClickLoginBtn = () => {
    Router.pushState('/login-form');
  };
}
export default LoginHeader;
