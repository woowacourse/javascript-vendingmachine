import CustomElement from './CustomElement';
import TEMPLATE from '../templates';

class SigninPage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.SIGNIN_PAGE;
  }

  setEvent() {}

  notify({}) {}
}

customElements.define('sign-in', SigninPage);

export default SigninPage;
