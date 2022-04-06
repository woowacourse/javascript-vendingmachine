import Auth from '../domain/Auth';
import { createDivElement, selectDom } from '../utils/dom';
import { TEMPLATE } from './template';

export default class LoginView {
  #loginContainer;
  #loginForm;
  #userEmail;
  #userPassword;

  constructor() {
    this.#loginContainer = createDivElement(TEMPLATE.LOGIN);
    this.#loginForm = selectDom('#login-form', this.#loginContainer);
    this.#userEmail = selectDom('#user-email', this.#loginContainer);
    this.#userPassword = selectDom('#user-password', this.#loginContainer);

    this.#loginForm.addEventListener('submit', this.#handleLogin);
  }

  #handleLogin = (e) => {
    e.preventDefault();
    const email = this.#userEmail.value;
    const password = this.#userPassword.value;

    Auth.login({ email, password });
  };

  get template() {
    return this.#loginContainer;
  }
}
