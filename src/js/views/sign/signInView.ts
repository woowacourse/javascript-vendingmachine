import singInTemplate from '../../templates/signInTemplate';
import { $, emit } from '../../utils/common';
import AuthManager from '../../auth/authManager';
import { SELECTOR } from '../../constants/viewConstants';
import { CUSTOM_EVENT } from '../../constants/appContants';
import showSnackbar from '../../utils/snackbar';

export default class SignInView {
  render() {
    const $signMain = $('#sign-main');
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', singInTemplate);

    $('#signin-submit').addEventListener('submit', this.handleSignInSubmit.bind(this));
    $('#offer-signup-button').addEventListener('click', this.handleOfferSignUpClick.bind(this));
  }

  async handleSignInSubmit(event) {
    try {
      event.preventDefault();
      const email = $('#email-input').value;
      const password = $('#password-input').value;

      const userData = await AuthManager.shared().signIn({ email, password });
      console.log(userData);
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  handleOfferSignUpClick(event) {
    const { url } = event.target.dataset;

    emit({ eventName: CUSTOM_EVENT.OFFER_SIGNUP_CLICK, detail: { url } });
  }
}
