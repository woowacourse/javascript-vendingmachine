import { createMainElement } from '../utils/dom';
import { loginPageTemplate } from './template';

export default class LoginPage {
  #loginPage;

  constructor() {
    this.#loginPage = createMainElement(loginPageTemplate);
  }

  get tabElements() {
    return this.#loginPage;
  }
}
