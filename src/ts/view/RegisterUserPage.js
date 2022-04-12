import { HASH } from '../constant/path';
import { SELECTOR } from '../constant/selector';
import { registerUserPageTemplate } from '../template/authPageTemplate';
import { selectDom, showSnackbar } from '../utils';
import { register, validateRegisterBehavior } from '../vendingMachine/authLogic';

class RegisterUserPage {
  constructor() {
    this.app = selectDom(SELECTOR.APP);
    this.registerForm = null;
    this.snackbar = null;
  }

  renderInitialState(isLoginUser) {
    if (isLoginUser) {
      location.hash = '';
      return;
    }

    this.app.replaceChildren();
    this.app.insertAdjacentHTML('afterbegin', registerUserPageTemplate);

    this.registerForm = selectDom(SELECTOR.USER_INFO_FORM, this.app);
    this.snackbar = selectDom(SELECTOR.SNACKBAR, this.app);

    this.registerForm.addEventListener('submit', this.#onSubmitRegisterForm);
  }

  #onSubmitRegisterForm = async (e) => {
    e.preventDefault();
    const userInfo = this.#convertToUserInfoObject(e.target);

    try {
      validateRegisterBehavior(userInfo);
      const { ok, body } = await register(userInfo);
      if (!ok) {
        throw new Error(body);
      }
    } catch (error) {
      showSnackbar(this.snackbar, error.message);
      return;
    }
    location.hash = HASH.LOGIN_USER;
  };

  #convertToUserInfoObject({ email, name, password, confirmPassword }) {
    return {
      email: email?.value.trim() ?? '',
      name: name?.value.trim() ?? '',
      password: password?.value.trim() ?? '',
      confirmPassword: confirmPassword?.value.trim() ?? '',
    };
  }
}

export default RegisterUserPage;
