import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';

class LoginPage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.LOGIN_PAGE;
  }

  setEvent() {}
}

customElements.define('login-page', LoginPage);

export default LoginPage;
