import { createElementByTemplate, selectDom } from '../../../utils/dom';
import { emitEvent } from '../../../utils/event';
import loginTemplate from './template';

export default class LoginTab {
  #loginTabContainer;
  #loginForm;
  #emailInput;
  #passwordInput;

  constructor() {
    this.#loginTabContainer = createElementByTemplate('div', loginTemplate);
    this.#loginTabContainer.id = 'app';
    this.#loginForm = selectDom('#login-form', this.#loginTabContainer);
    this.#emailInput = selectDom('#login-email', this.#loginTabContainer);
    this.#passwordInput = selectDom('#login-password', this.#loginTabContainer);

    this.#loginForm.addEventListener('submit', this.#handleLoginForm);
  }

  get element() {
    return this.#loginTabContainer;
  }

  #handleLoginForm = (e) => {
    e.preventDefault();
    const email = this.#emailInput.value;
    const password = this.#passwordInput.value;
    emitEvent(this.element, 'login', { email, password });
  };
}
