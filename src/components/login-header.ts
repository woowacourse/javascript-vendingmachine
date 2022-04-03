import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('login-header')
class LoginHeader extends Component {
  template(): string {
    return `
    <button type="button" class="btn">로그인</button>
    `;
  }
}
export default LoginHeader;
