import singInTemplate from '../../templates/signInTemplate';
import { $, emit } from '../../utils/common';
import AuthManager from '../../auth/authManager';
import { SELECTOR } from '../../constants/viewConstants';
import { CUSTOM_EVENT } from '../../constants/appContants';
import showSnackbar from '../../utils/snackbar';

export default class SignInView {
  render() {
    const $signMain = $(SELECTOR.ID.SIGN_MAIN);
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', singInTemplate);

    $(SELECTOR.ID.SIGNIN_SUBMIT).addEventListener('submit', this.handleSignInSubmit.bind(this));
    $(SELECTOR.ID.OFFER_SIGNUP_BUTTON).addEventListener(
      'click',
      this.handleOfferSignUpClick.bind(this)
    );
  }

  async handleSignInSubmit(event) {
    try {
      event.preventDefault();
      const email = $(SELECTOR.ID.EMAIL_INPUT).value;
      const password = $(SELECTOR.ID.PASSWORD_INPUT).value;

      await AuthManager.shared().signIn({ email, password });

      emit({ eventName: CUSTOM_EVENT.SIGN_COMPLETE });
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  handleOfferSignUpClick(event) {
    const { url } = event.target.dataset;

    emit({ eventName: CUSTOM_EVENT.OFFER_SIGNUP_CLICK, detail: { url } });
  }
}
