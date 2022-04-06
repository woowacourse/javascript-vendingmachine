import { $ } from "../../utils/dom";
import { loginTemplate } from "./loginTemplate";

type HideAppTitle = () => void;
type HideLoginButton = () => void;

class LoginComponent {
  loginContainer: HTMLElement;

  constructor(private hideAppTitle: HideAppTitle, private hideLoginButton: HideLoginButton) {
    this.loginContainer = $(".login-manange__container");
    this.loginContainer.replaceChildren();
    this.loginContainer.insertAdjacentHTML("beforeend", loginTemplate());
  }

  show() {
    this.loginContainer.classList.remove("hide");
    this.hideAppTitle();
    this.hideLoginButton();
  }
}

export default LoginComponent;
