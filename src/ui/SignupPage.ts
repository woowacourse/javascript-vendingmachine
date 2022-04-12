import CustomElement from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit } from '../utils';

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

  setEvent() {
    addEvent(this, 'submit', '.signup-form', (e) => this.handleSignup(e));
  }

  handleSignup(e) {
    e.preventDefault();

    const email = e.target.signupEmail.value;
    const userName = e.target.signupUserName.value;
    const password = e.target.signupPassword.value;
    const passwordConfirm = e.target.signupPasswordConfirm.value;

    emit('.signup-form', '@signup', { email, userName, password, passwordConfirm }, this);
  }
}

customElements.define('sign-up', SignupPage);

export default SignupPage;
