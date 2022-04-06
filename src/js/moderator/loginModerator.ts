import LoginView from "../ui/loginPageView";
import { EVENT_TYPE } from "../constant";
import { on } from "../util/event";

class LoginModerator {
  loginView;
  constructor() {
    this.loginView = new LoginView();
    on<any>(window, EVENT_TYPE.LOGIN, (e) => {
      this.login(e.detail);
    });
  }

  init() {
    this.loginView.init();
  }

  login({ email, password }) {
    console.log("gg");
    // api 요청 보내주기~
  }
}

export default LoginModerator;
