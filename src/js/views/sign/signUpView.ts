import AuthManager from '../../auth/authManager';
import { signUpTemplate } from '../../templates/signUpTemplate';
import { $, emit } from '../../utils/common';
import showSnackbar from '../../utils/snackbar';
import { CUSTOM_EVENT } from '../../constants/appContants';

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

      await AuthManager.shared().singUp({ email, name, password });

      emit({ eventName: CUSTOM_EVENT.SIGN_COMPLETE });
    } catch (error) {
      showSnackbar(error.message);
    }
  }
}
