import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';

class SignupPage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.SIGNUP_PAGE;
  }

  setEvent() {}
}

customElements.define('signup-page', SignupPage);

export default SignupPage;
