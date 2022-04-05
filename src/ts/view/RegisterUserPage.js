import { registerUserPageTemplate } from '../template';
import { selectDom } from '../utils';

class RegisterUserPage {
  constructor(registerUser) {
    this.registerUser = registerUser;

    this.app = selectDom('#app');
  }

  renderInitialRegisterPageState() {
    this.app.replaceChildren();
    this.app.insertAdjacentHTML('afterbegin', registerUserPageTemplate);

    this.registerForm = selectDom('.user-info-form', this.app);

    this.registerForm.addEventListener('submit', this.#onSubmitRegisterForm);
  }

  #onSubmitRegisterForm = (e) => {
    e.preventDefault();
    const { email, name, password, confirmPassword } = e.target;

    try {
      this.registerUser.validateRegisterBehavior({
        email: email.value.trim(),
        name: name.value.trim(),
        password: password.value.trim(),
        confirmPassword: confirmPassword.value.trim(),
      });
    } catch (error) {
      alert(error.message);
      return;
    }
  };
}

export default RegisterUserPage;
