import Component from '../abstract/component';
import { customElement } from '../decorators/decortators';

@customElement('login-info')
class LoginInfo extends Component {
  template(): string {
    return `
    <button type="button" class="btn btn-primary">우</button>
    `;
  }
}
export default LoginInfo;
