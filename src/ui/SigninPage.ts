import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { emit, addEvent } from '../utils';

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

  setEvent() {
    addEvent(this, 'submit', '.signin-form', (e) => this.handleSignin(e));
  }

  handleSignin(e) {
    e.preventDefault();

    const email = e.target.signinEmail.value;
    const password = e.target.signinPassword.value;

    emit('.signin-form', '@signin', { email, password }, this);
  }
}

customElements.define('sign-in', SigninPage);

export default SigninPage;
