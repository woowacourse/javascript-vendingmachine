import { Page, Notification } from '../CustomElement';
import TEMPLATE from '../../templates';
import { addEvent, emit, showSnackbar, $ } from '../../utils';
import { CUSTOM_EVENT } from '../../constants';

class SignupPage extends Page {
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
    addEvent(this, 'submit', '.signup-form', (e: SubmitEvent & { target: HTMLFormElement }) => this.handleSignup(e));
  }

  handleSignup(e: SubmitEvent & { target: HTMLFormElement }) {
    e.preventDefault();
    const form = e.target;

    emit(
      '.signup-form',
      CUSTOM_EVENT.AUTH.SIGNUP,
      {
        email: form.email.value,
        name: form.userName.value,
        password: form.password.value,
        passwordConfirm: form.passwordConfirm.value,
      },
      this,
    );
  }

  notify({ userName }: Notification) {
    ($('.signup-form', this) as HTMLFormElement).reset();
    showSnackbar(`${userName}님 회원가입을 축하합니다.`);
  }
}

customElements.define('signup-page', SignupPage);

export default SignupPage;
