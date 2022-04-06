import { HASH } from '../constant/path';
import { registerUserPageTemplate } from '../template';
import { selectDom } from '../utils';
import { register, validateRegisterBehavior } from '../vendingMachine/authLogic';

class RegisterUserPage {
  constructor() {
    this.app = selectDom('#app');
  }

  renderInitialRegisterPageState() {
    this.app.replaceChildren();
    this.app.insertAdjacentHTML('afterbegin', registerUserPageTemplate);

    this.registerForm = selectDom('.user-info-form', this.app);

    this.registerForm.addEventListener('submit', this.#onSubmitRegisterForm);
  }

  #onSubmitRegisterForm = async (e) => {
    e.preventDefault();
    const userInfo = this.#convertToUserInfoObject(e.target);

    try {
      validateRegisterBehavior(userInfo);
      const [ok, body] = await register(userInfo);
      if (!ok) {
        throw new Error(body);
      }
    } catch (error) {
      alert(error.message);
      return;
    }
    location.href = `${location.origin}/${HASH.LOGIN_USER}`;
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
