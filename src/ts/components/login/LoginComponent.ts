import { $ } from "../../utils/dom";
import { ConvertTemplate, HideHeader } from "../App";
import { loginTemplate } from "./loginTemplate";

class LoginComponent {
  loginContainer: HTMLElement;
  signupButton: HTMLButtonElement;
  loginConfirmButton: HTMLButtonElement;
  loginEmailInput: HTMLInputElement;
  loginPasswordInput: HTMLInputElement;
  loginForm: HTMLFormElement;

  constructor(private hideHeader: HideHeader, private convertTemplate: ConvertTemplate) {
    this.loginContainer = $(".login-manange__container");
    this.loginContainer.replaceChildren();
    this.loginContainer.insertAdjacentHTML("beforeend", loginTemplate());

    this.loginForm = $(".login-form");
    this.loginEmailInput = $(".login-form__email-input");
    this.loginPasswordInput = $(".login-form__password-input");
    this.loginConfirmButton = $(".login-form__confirm-button");
    this.signupButton = $(".login-form__signup-button");

    this.loginForm.addEventListener("submit", this.handleLogin);
    this.signupButton.addEventListener("click", this.handleSignUpButton);
  }

  handleLogin = (e) => {
    e.preventDefault();
    const email = this.loginEmailInput.value;
    const password = this.loginPasswordInput.value;
    console.log(email, password);

    this.login(email, password);
  };

  async login(email, password) {
    //
  }

  handleSignUpButton = () => {
    history.pushState({ path: "#signup" }, null, "#signup");
    this.convertTemplate("#signup");
  };

  show() {
    this.loginContainer.classList.remove("hide");
    this.hideHeader();
  }
}

export default LoginComponent;
