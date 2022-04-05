import CustomElement from './CustomElement';
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

  notify({}) {}
}

customElements.define('sign-up', SignupPage);

export default SignupPage;
