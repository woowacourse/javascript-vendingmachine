import { $, $$, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { signUpTemplate } from '../templates/signUpTemplate';

export default class SignUpView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  handleSubmitSignUpForm(event) {
    try {
      event.preventDefault();
      const targetId = event.target.id;
      const email = $('#signup-email-input').value;
      const name = $('#signup-name-input').value;
      const password = $('#signup-password-input').value;

      emitCustomEvent('SIGN_UP', { detail: { email, name, password, targetId } });
    } catch (error) {
      alert(error.message);
    }
  }

  render(isLogin) {
    console.log('SignUpView Render');
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', signUpTemplate(isLogin));

    if (!isLogin) {
      $('#signup-form').addEventListener('submit', this.handleSubmitSignUpForm.bind(this));
    }
  }
}
