import SignUpView from "../ui/signUpPageView";
import Authorization from "../domain/authorization";
import { EVENT_TYPE, SNACKBAR_TYPE, ERROR_MESSAGE } from "../constant";
import { on } from "../util/event";
import { ISignUpEvent } from "../type";
import snackbarUI from "../ui/snackbarUI";

class SignUpModerator {
  signUpView;
  authorization;

  constructor() {
    this.signUpView = new SignUpView();
    this.authorization = new Authorization();
    on<ISignUpEvent>(window, EVENT_TYPE.SIGN_UP, (e) => {
      this.signUp(e.detail);
    });
  }

  async init() {
    const { isError } = await this.authorization.getLoggedInUser();
    if (!isError) {
      alert(ERROR_MESSAGE.WRONG_ACCESS);
      location.href = "/";
      return;
    }
    this.signUpView.init();
  }

  async signUp(userInfo: ISignUpEvent) {
    try {
      await this.authorization.signUp(userInfo);
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  }
}

export default SignUpModerator;
