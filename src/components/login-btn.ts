import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';
import Router from '../router';

@customElement('login-btn')
class LoginBtn extends Component {
  template(): string {
    return `
      <button class="btn btn-secondary">로그인</button>
    `;
  }

  setEvent() {
    this.addEvent('click', 'button', this.onClickLoginBtn);
  }

  onClickLoginBtn = () => {
    Router.pushState('/login');
  };

  mount() {
    this.render();
  }

  render() {
    this.innerHTML = this.template();
  }
}

export default LoginBtn;
