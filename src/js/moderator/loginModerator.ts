import LoginView from "../ui/loginPageView";
import Authorization from "../domain/authorization";
import { EVENT_TYPE } from "../constant";
import { on } from "../util/event";

class LoginModerator {
  loginView;
  authorization;
  constructor() {
    this.loginView = new LoginView();
    this.authorization = new Authorization();
    on<any>(window, EVENT_TYPE.LOGIN, (e) => {
      this.login(e.detail);
    });
  }

  init() {
    this.loginView.init();
  }

  login({ email, password }) {
    this.authorization.login({ email, password });
  }
}

export default LoginModerator;
