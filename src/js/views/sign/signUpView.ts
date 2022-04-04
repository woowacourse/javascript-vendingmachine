import { authUtils } from '../../auth/authUtils';
import { signUpTemplate } from '../../templates/signUpTemplate';
import { $ } from '../../utils/common';
import showSnackbar from '../../utils/snackbar';

export default class SignUpView {
  render() {
    const $signMain = $('#sign-main');
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', signUpTemplate);

    $('#signup-submit').addEventListener('submit', this.handleSignUpSubmit.bind(this));
  }

  async handleSignUpSubmit(event) {
    try {
      event.preventDefault();
      const email = $('#email-input').value;
      const name = $('#name-input').value;
      const password = $('#password-input').value;
      const confirmPassword = $('#password-confirm-input').value;

      const userData = await authUtils.singUp({ email, name, password });
      console.log(userData.accessToken);
    } catch (error) {
      showSnackbar(error.message);
    }
  }
}
