import { $, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { signUpTemplate } from '../templates/signUpTemplate';
import { checkPassword } from '../validates/validates';

export default class SignUpView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  private handleSubmitSignUpForm(event) {
    event.preventDefault();
    try {
      const targetId = event.target.id;
      const email = $(SELECTOR.ID.SIGNUP_EMAIL_INPUT).value.trim();
      const name = $(SELECTOR.ID.SIGNUP_NAME_INPUT).value.trim();
      const password = $(SELECTOR.ID.SIGNUP_PASSWORD_INPUT).value;

      checkPassword(password);
      emitCustomEvent('SIGN_UP', { detail: { email, name, password, targetId } });
    } catch (error) {
      alert(error.message);
    }
  }

  public render(isLogin) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', signUpTemplate(isLogin));

    if (!isLogin) {
      $(SELECTOR.ID.SIGNUP_FORM).addEventListener('submit', this.handleSubmitSignUpForm.bind(this));
    }
  }
}
