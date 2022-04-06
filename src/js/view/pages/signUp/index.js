import { createElementByTemplate, generateSnackBar, selectDom } from '../../../utils/dom';
import { emitEvent } from '../../../utils/event';
import signUpTemplate from './template';

export default class SignUpTab {
  #signUpContainer;
  #signUpForm;
  #emailInput;
  #nameInput;
  #passwordInput;
  #passwordConfirmInput;

  constructor() {
    this.#signUpContainer = createElementByTemplate('div', signUpTemplate);
    this.#signUpContainer.id = 'app';
    this.#signUpForm = selectDom('#sign-up-form', this.#signUpContainer);
    this.#emailInput = selectDom('#sign-up-email', this.#signUpContainer);
    this.#nameInput = selectDom('#sign-up-name', this.#signUpContainer);
    this.#passwordInput = selectDom('#sign-up-password', this.#signUpContainer);
    this.#passwordConfirmInput = selectDom(
      '#sign-up-password-confirm',
      this.#signUpContainer
    );

    this.#signUpForm.addEventListener('submit', this.#handlesignUpForm);
  }

  get element() {
    return this.#signUpContainer;
  }

  #handlesignUpForm = (e) => {
    e.preventDefault();
    const email = this.#emailInput.value;
    const name = this.#nameInput.value;
    const password = this.#passwordInput.value;
    if (password !== this.#passwordConfirmInput.value) {
      generateSnackBar('비밀번호와 비밀번호 확인이 일치하지않습니다.');
      return;
    }
    emitEvent(this.element, 'sign-up', { email, name, password });
  };
}
