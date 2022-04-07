import LoginView from "../ui/loginPageView";
import Authorization from "../domain/authorization";
import { EVENT_TYPE } from "../constant";
import { on } from "../util/event";
import { ILoginEvent } from "../type";
class LoginModerator {
  loginView;
  authorization;
  constructor() {
    this.loginView = new LoginView();
    this.authorization = new Authorization();
    on<ILoginEvent>(window, EVENT_TYPE.LOGIN, (e) => {
      this.login(e.detail);
    });
  }

  async init() {
    const { isError } = await this.authorization.isLoggedIn();
    if (!isError) {
      alert("잘못된 접근입니다.");
      location.href = "/";
      return;
    }
    this.loginView.init();
  }

  async login({ email, password }) {
    try {
      await this.authorization.login({ email, password });
    } catch (err) {
      alert(err);
    }
  }
}

export default LoginModerator;
