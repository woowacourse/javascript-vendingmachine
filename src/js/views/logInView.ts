import { $, $$, emitCustomEvent, showSnackBar } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { logInTemplate } from '../templates/logInTemplate';
import { checkPassword } from '../validates/validates';

export default class LogInView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  handleSubmitLogInForm(event) {
    try {
      event.preventDefault();
      const targetId = event.target.id;
      const email = $('#login-email-input').value;
      const password = $('#login-password-input').value;

      checkPassword(password);
      emitCustomEvent('LOG_IN', { detail: { email, password, targetId } });
    } catch (error) {
      alert(error.message);
    }
  }

  handleClickGotoSignUpButton(event: { target: HTMLButtonElement }) {
    const targetId = event.target.id;

    emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
  }

  render(isLogin) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', logInTemplate(isLogin));

    if (!isLogin) {
      $('#login-form').addEventListener('submit', this.handleSubmitLogInForm.bind(this));
      $('#go-to-signup').addEventListener('click', this.handleClickGotoSignUpButton);
    }
  }
}
