import { createMainElement, getInputValuesFromForm, selectDom } from '../utils/dom';
import { registerPageTemplate } from './template';

export default class RegisterPage {
  #snackbar;
  #authorization;
  #registerPage;
  #registerForm;

  constructor(authorization, snackBar) {
    this.#snackbar = snackBar;
    this.#authorization = authorization;

    this.#registerPage = createMainElement(registerPageTemplate);
    this.#registerForm = selectDom('.auth-form', this.#registerPage);

    this.#registerForm.addEventListener('submit', this.#handleRegister);
  }

  get tabElements() {
    return this.#registerPage;
  }

  #handleRegister = async (e) => {
    e.preventDefault();

    const {
      email,
      name,
      password,
      'password-confirm': passwordConfirm,
    } = getInputValuesFromForm(e.target);

    try {
      await this.#authorization.register({ email, name, password, passwordConfirm });

      window.location.href = '#/manage';
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
