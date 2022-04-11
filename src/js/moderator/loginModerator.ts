import LoginView from "../ui/loginPageView";
import Authorization from "../domain/authorization";
import { EVENT_TYPE, SNACKBAR_TYPE } from "../constant";
import { on } from "../util/event";
import { ILoginEvent } from "../type";
import snackbarUI from "../ui/snackbarUI";
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
    const { isError } = await this.authorization.getLoggedInUser();
    if (!isError) {
      alert("잘못된 접근입니다.");
      location.href = "/";
      return;
    }
    this.loginView.init();
  }

  async login({ email, password }: ILoginEvent) {
    try {
      await this.authorization.login({ email, password });
    } catch (err) {
      snackbarUI.open(SNACKBAR_TYPE.ERROR, err.message);
    }
  }
}

export default LoginModerator;
