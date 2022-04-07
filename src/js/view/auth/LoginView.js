import Auth from '../../domain/Auth';
import { createDivElement, selectDom } from '../../utils/dom';
import { TEMPLATE } from '../template';
import Snackbar from '../SnackBar';
import { SNACKBAR_MESSAGE } from '../../constants';

export default class LoginView {
  #loginContainer;
  #loginForm;
  #userEmail;
  #userPassword;

  constructor() {
    //멤버변수 생성
    this.#loginContainer = createDivElement(TEMPLATE.LOGIN);
    this.#loginForm = selectDom('#login-form', this.#loginContainer);
    this.#userEmail = selectDom('#user-email', this.#loginContainer);
    this.#userPassword = selectDom('#user-password', this.#loginContainer);

    //이벤트 바인딩
    this.#loginForm.addEventListener('submit', this.#handleLogin);
  }

  get template() {
    return this.#loginContainer;
  }

  #handleLogin = (e) => {
    e.preventDefault();
    const email = this.#userEmail.value;
    const password = this.#userPassword.value;

    Auth.login({ email, password });
    Snackbar.dispatch(SNACKBAR_MESSAGE.LOGIN_SUCCESS);
  };
}
