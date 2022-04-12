import { $, emitCustomEvent } from '../utils/common';
import { SELECTOR } from '../constants/constants';
import { logInTemplate } from '../templates/logInTemplate';
import { checkPassword } from '../validates/validates';

export default class LogInView {
  $content: HTMLDivElement;
  constructor() {
    this.$content = $(SELECTOR.ID.CONTENT);
  }

  private handleSubmitLogInForm(event) {
    event.preventDefault();
    try {
      const targetId = event.target.id;
      const email = $(SELECTOR.ID.LOGIN_EMAIL_INPUT).value;
      const password = $(SELECTOR.ID.LOGIN_PASSWORD_INPUT).value;

      checkPassword(password);
      emitCustomEvent('LOG_IN', { detail: { email, password, targetId } });
    } catch (error) {
      alert(error.message);
    }
  }

  private handleClickGotoSignUpButton(event: { target: HTMLButtonElement }) {
    const targetId = event.target.id;

    emitCustomEvent('ROUTE_CHANGE', { detail: { targetId } });
  }

  public render(isLogin) {
    this.$content.replaceChildren();
    this.$content.insertAdjacentHTML('beforeend', logInTemplate(isLogin));

    if (!isLogin) {
      $(SELECTOR.ID.LOGIN_FORM).addEventListener('submit', this.handleSubmitLogInForm.bind(this));
      $(SELECTOR.ID.GO_TO_SIGNUP).addEventListener('click', this.handleClickGotoSignUpButton);
    }
  }
}
