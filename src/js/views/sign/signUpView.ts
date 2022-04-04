import { signUpTemplate } from '../../templates/signUpTemplate';
import { $ } from '../../utils/common';

export default class SignUpView {
  render() {
    const $signMain = $('#sign-main');
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', signUpTemplate);

    $('#signup-submit').addEventListener('submit', this.handleSignUpSubmit.bind(this));
  }

  handleSignUpSubmit(event) {
    event.preventDefault();
    const email = $('#email-input').value;
    const name = $('#name-input').value;
    const password = $('#password-input').value;
    const confirmPassword = $('#password-confirm-input').value;

    console.log(email, name, password, confirmPassword);
  }
}
