import SignUpView from "../ui/signUpPageView";
import Authorization from "../domain/authorization";
import { EVENT_TYPE } from "../constant";
import { on } from "../util/event";

class SignUpModerator {
  signUpView;
  authorization;

  constructor() {
    this.signUpView = new SignUpView();
    this.authorization = new Authorization();
    on<any>(window, EVENT_TYPE.SIGN_UP, (e) => {
      this.signUp(e.detail);
    });
  }

  init() {
    this.signUpView.init();
  }

  signUp(userInfo) {
    this.authorization.signUp(userInfo);
  }
}

export default SignUpModerator;
