import singInTemplate from '../../templates/signInTemplate';
import { $, emit } from '../../utils/common';
import { authUtils } from '../../auth/authUtils';
import { SELECTOR } from '../../constants/viewConstants';
import { CUSTOM_EVENT } from '../../constants/appContants';

export default class SignInView {
  render() {
    const $signMain = $('#sign-main');
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', singInTemplate);

    $('#signin-submit').addEventListener('submit', this.handleSignInSubmit.bind(this));
    $('#offer-signup-button').addEventListener('click', this.handleOfferSignUpClick.bind(this));
  }

  async handleSignInSubmit(event) {
    event.preventDefault();
    const email = $('#email-input').value;
    const password = $('#password-input').value;

    await authUtils.getUserData({ email, password });

    console.log(email, password);
  }

  handleOfferSignUpClick(event) {
    const { url } = event.target.dataset;

    emit({ eventName: CUSTOM_EVENT.OFFER_SIGNUP_CLICK, detail: { url } });
  }
}
