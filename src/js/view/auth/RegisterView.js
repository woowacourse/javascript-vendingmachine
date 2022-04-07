import { ERROR, SNACKBAR_MESSAGE } from '../../constants';
import Auth from '../../domain/auth/Auth';
import { createDivElement, selectDom } from '../../utils/dom';
import Snackbar from '../SnackBar';
import { TEMPLATE } from '../template';

export default class RegisterView {
  #registerContainer;
  #registerForm;
  #email;
  #name;
  #password;
  #passwordConfirm;

  constructor() {
    //멤버변수 생성
    this.#registerContainer = createDivElement(TEMPLATE.REGISTER);
    this.#registerForm = selectDom('#register-form', this.#registerContainer);
    this.#email = selectDom('#email', this.#registerContainer);
    this.#name = selectDom('#name', this.#registerContainer);
    this.#password = selectDom('#password', this.#registerContainer);
    this.#passwordConfirm = selectDom('#password-confirm', this.#registerContainer);

    //이벤트 등록
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
      Snackbar.dispatch(SNACKBAR_MESSAGE.REGISTER_SUCCESS);
    } catch (error) {
      Snackbar.dispatch(error, ERROR);
    }
  };
}
