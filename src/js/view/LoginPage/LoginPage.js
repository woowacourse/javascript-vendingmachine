import { createMainElement, getInputValuesFromForm } from '../../utils/dom';
import loginPageTemplate from './LoginPageTemplate';

export default class LoginPage {
  #snackbar;
  #authorization;
  #loginPage;

  constructor(authorization, snackBar) {
    this.#snackbar = snackBar;
    this.#authorization = authorization;

    this.#loginPage = createMainElement(loginPageTemplate);

    this.#loginPage.addEventListener('submit', this.#handleLogin);
  }

  get tabElements() {
    return this.#loginPage;
  }

  #handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = getInputValuesFromForm(e.target);

    try {
      await this.#authorization.login({ email, password });

      window.location.href = '#/manage';
    } catch ({ message }) {
      this.#snackbar.addToMessageList(message);
    }
  };
}
