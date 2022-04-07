import Auth from '../domain/Auth';
import { createDivElement, selectDom } from '../utils/dom';
import Snackbar from './SnackBar';
import { TEMPLATE } from './template';

export default class RegisterView {
  #registerContainer;
  #registerForm;
  #email;
  #name;
  #password;
  #passwordConfirm;

  constructor() {
    this.#registerContainer = createDivElement(TEMPLATE.REGISTER);
    this.#registerForm = selectDom('#register-form', this.#registerContainer);
    this.#email = selectDom('#email', this.#registerContainer);
    this.#name = selectDom('#name', this.#registerContainer);
    this.#password = selectDom('#password', this.#registerContainer);
    this.#passwordConfirm = selectDom('#password-confirm', this.#registerContainer);

    this.#registerForm.addEventListener('submit', this.#handleRegister);
  }

  get template() {
    return this.#registerContainer;
  }

  #handleRegister = (e) => {
    e.preventDefault();
    const email = this.#email.value;
    const name = this.#name.value;
    const password = this.#password.value;
    const passwordConfirm = this.#passwordConfirm.value;

    try {
      Auth.register({ email, name, password, passwordConfirm });
      Snackbar.dispatch('정상적으로 회원가입되었습니다');
    } catch (error) {
      Snackbar.dispatch(error, 'fail');
    }
  };
}
