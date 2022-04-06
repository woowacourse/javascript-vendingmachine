import SignUpView from "../ui/signUpPageView";
import { EVENT_TYPE } from "../constant";
import { on } from "../util/event";

class SignUpModerator {
  signUpView;
  constructor() {
    this.signUpView = new SignUpView();
    on<any>(window, EVENT_TYPE.SIGN_UP, (e) => {
      this.signUp(e.detail);
    });
  }

  init() {
    this.signUpView.init();
  }

  signUp({ email, name, password }) {
    console.log("gg");
    // api 요청 보내주기~
  }
}

export default SignUpModerator;
