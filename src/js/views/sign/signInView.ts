import { signInTemplate } from '../../templates/sign/signInTemplate';
import { $, emit } from '../../utils/common';
import { SELECTOR } from '../../constants/viewConstants';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import showSnackbar from '../../utils/snackbar';
import AuthAPI from '../../api/authAPI';
import Storage from '../../api/storage';

export default class SignInView {
  render() {
    const $signMain = $(SELECTOR.ID.SIGN_MAIN);
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', signInTemplate);

    $(SELECTOR.ID.SIGNIN_SUBMIT).addEventListener('submit', this.handleSignInSubmit.bind(this));
    $(SELECTOR.ID.OFFER_SIGNUP_BUTTON).addEventListener(
      'click',
      this.handleOfferSignUpClick.bind(this)
    );
  }

  private async handleSignInSubmit(event: SubmitEvent) {
    try {
      event.preventDefault();
      const signInputValues = this.getSignInInputValues();
      const { accessToken, user } = await AuthAPI.signIn(signInputValues);

      Storage.setAccessToken(accessToken);
      Storage.setUserData(user);

      emit({
        eventName: CUSTOM_EVENT.PAGE_CHANGE,
        detail: { page: URL.MAIN, section: URL.MANAGE_ITEM },
      });
    } catch (error) {
      showSnackbar(error.message);
    }
  }

  private handleOfferSignUpClick(event: { target: HTMLButtonElement }) {
    const { url } = event.target.dataset;

    emit({ eventName: CUSTOM_EVENT.PAGE_CHANGE, detail: { page: URL.SIGN, section: url } });
  }

  private getSignInInputValues() {
    const email = $(SELECTOR.ID.EMAIL_INPUT).value;
    const password = $(SELECTOR.ID.PASSWORD_INPUT).value;

    return { email, password };
  }
}
