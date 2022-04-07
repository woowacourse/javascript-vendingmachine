import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { signUpTemplate } from '../templates/signUpTemplate';
import { checkPassword } from '../validates/validates';

export default class SignUpView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  handleSubmitSignUpForm(event) {
    try {
      event.preventDefault();
      const targetId = event.target.id;
      const email = $('#signup-email-input').value.trim();
      const name = $('#signup-name-input').value.trim();
      const password = $('#signup-password-input').value;

      checkPassword(password);
      emitCustomEvent('SIGN_UP', { detail: { email, name, password, targetId } });
    } catch (error) {
      alert(error.message);
    }
  }

  render(isLogin) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', signUpTemplate(isLogin));

    if (!isLogin) {
      $('#signup-form').addEventListener('submit', this.handleSubmitSignUpForm.bind(this));
    }
  }
}
