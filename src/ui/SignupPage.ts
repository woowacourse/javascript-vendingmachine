import { CustomElement } from './CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit, showSnackbar } from '../utils';
import Authentication from '../domain/Authentication';

class SignupPage extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    Authentication.instance.subscribe('subscribeSignupPage', this);
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return TEMPLATE.SIGNUP_PAGE;
  }

  setEvent() {
    addEvent(this, 'submit', '.signup-form', (e: SubmitEvent & { target: HTMLFormElement }) => this.handleSignup(e));
  }

  handleSignup(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();
    const form = e.target;

    // if (form.password.value !== form.passwordConfirm.value) {
    //   showSnackbar('비밀번호가 일치하지 않습니다.');
    //   return;
    // }

    emit(
      '.signup-form',
      '@signup',
      { email: form.email.value, name: form.userName.value, password: form.password.value },
      this,
    );
  }
}

customElements.define('signup-page', SignupPage);

export default SignupPage;
