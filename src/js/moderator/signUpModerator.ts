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

  async init() {
    const { isError } = await this.authorization.isLoggedIn();
    if (!isError) {
      alert("잘못된 접근입니다.");
      location.href = "/";
      return;
    }
    this.signUpView.init();
  }

  signUp(userInfo) {
    this.authorization.signUp(userInfo);
  }
}

export default SignUpModerator;
