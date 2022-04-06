import { $ } from "../../utils/dom";
import { ConvertTemplate, HideAppTitle, HideLoginButton } from "../App";
import { loginTemplate } from "./loginTemplate";

class LoginComponent {
  loginContainer: HTMLElement;
  signupButton: HTMLButtonElement;
  loginConfirmButton: HTMLButtonElement;
  loginEmailInput: HTMLInputElement;
  loginPasswordInput: HTMLInputElement;
  loginForm: HTMLFormElement;

  constructor(
    private hideAppTitle: HideAppTitle,
    private hideLoginButton: HideLoginButton,
    private convertTemplate: ConvertTemplate,
  ) {
    this.loginContainer = $(".login-manange__container");
    this.loginContainer.replaceChildren();
    this.loginContainer.insertAdjacentHTML("beforeend", loginTemplate());

    this.loginForm = $(".login-manage__form");
    this.loginEmailInput = $(".login-manage__email-input");
    this.loginPasswordInput = $(".login-manage__password-input");
    this.loginConfirmButton = $(".login-manage__confirm-button");
    this.signupButton = $(".login-manage__signup-button");

    this.loginForm.addEventListener("submit", this.handleLogin);
    this.signupButton.addEventListener("click", this.handleSignUp);
  }

  handleLogin = (e) => {
    e.preventDefault();
    const email = this.loginEmailInput.value;
    const password = this.loginPasswordInput.value;
    console.log(email, password);
  };

  handleSignUp = () => {
    history.pushState({ path: "#signup" }, null, "#signup");
    this.convertTemplate("#signup");
  };

  show() {
    this.loginContainer.classList.remove("hide");
    this.hideAppTitle();
    this.hideLoginButton();
  }
}

export default LoginComponent;
