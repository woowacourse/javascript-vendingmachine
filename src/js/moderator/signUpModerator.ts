import SignUpView from "../ui/signUpPageView";
import Authorization from "../domain/authorization";
import { EVENT_TYPE } from "../constant";
import { on } from "../util/event";
import { ISignUpEvent } from "../type";

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
    const { isError } = await this.authorization.isLoggedIn();
    if (!isError) {
      alert("잘못된 접근입니다.");
      location.href = "/";
      return;
    }
    this.signUpView.init();
  }

  async signUp(userInfo) {
    try {
      await this.authorization.signUp(userInfo);
    } catch (err) {
      alert(err);
    }
  }
}

export default SignUpModerator;
