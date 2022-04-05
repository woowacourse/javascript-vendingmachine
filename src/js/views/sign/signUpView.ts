import AuthManager from '../../auth/authManager';
import { signUpTemplate } from '../../templates/sign/signUpTemplate';
import { $, emit } from '../../utils/common';
import showSnackbar from '../../utils/snackbar';
import { CUSTOM_EVENT, URL } from '../../constants/appContants';
import { signValidate } from '../../validates/signValidate';
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
      const email = $(SELECTOR.ID.EMAIL_INPUT).value;
      const name = $(SELECTOR.ID.NAME_INPUT).value;
      const password = $(SELECTOR.ID.PASSWORD_INPUT).value;
      const confirmPassword = $(SELECTOR.ID.PASSWORD_CONFIRM_INPUT).value;

      signValidate.checkSignUpInputs({ email, name, password, confirmPassword });

      await AuthManager.shared().signUp({ email, name, password });

      emit({
        eventName: CUSTOM_EVENT.ROUTE_CHANGE,
        detail: { url: URL.MANAGE_ITEM, page: URL.MAIN },
      });
      emit({ eventName: CUSTOM_EVENT.RENDER_PAGE });
    } catch (error) {
      showSnackbar(error.message);
    }
  }
}
