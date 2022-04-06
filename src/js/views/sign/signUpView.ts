import Auth from '../../api/auth';
import Storage from '../../api/storage';
import { signUpTemplate } from '../../templates/sign/signUpTemplate';
import { $, emit } from '../../utils/common';
import showSnackbar from '../../utils/snackbar';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { SELECTOR } from '../../constants/viewConstants';

export default class SignUpView {
  render() {
    const $signMain = $(SELECTOR.ID.SIGN_MAIN);
    $signMain.replaceChildren();
    $signMain.insertAdjacentHTML('beforeend', signUpTemplate);

    $(SELECTOR.ID.SIGNUP_SUBMIT).addEventListener('submit', this.handleSignUpSubmit.bind(this));
  }

  private async handleSignUpSubmit(event: SubmitEvent) {
    try {
      event.preventDefault();
      const signUpInputValues = this.getSignUpInputValues();
      const { accessToken, user } = await Auth.signUp(signUpInputValues);

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

  private getSignUpInputValues() {
    const email = $(SELECTOR.ID.EMAIL_INPUT).value;
    const name = $(SELECTOR.ID.NAME_INPUT).value;
    const password = $(SELECTOR.ID.PASSWORD_INPUT).value;
    const confirmPassword = $(SELECTOR.ID.PASSWORD_CONFIRM_INPUT).value;

    return { email, name, password, confirmPassword };
  }
}
