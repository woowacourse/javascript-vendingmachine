import { $ } from "../../utils/dom";
import { INFOMATION_MESSAGES, KEY } from "../../utils/constants";
import { saveSessionStorage } from "../../utils/sessionStorage";
import { ConvertTemplate, HideHeader } from "../App";
import Snackbar from "../Snackbar";
import { loginTemplate } from "./loginTemplate";
import { requestLogin } from "../../api";

class LoginComponent {
  loginContainer: HTMLElement;
  signupButton: HTMLButtonElement;
  loginConfirmButton: HTMLButtonElement;
  loginEmailInput: HTMLInputElement;
  loginPasswordInput: HTMLInputElement;
  loginForm: HTMLFormElement;
  snackbar: Snackbar;

  constructor(private hideHeader: HideHeader, private convertTemplate: ConvertTemplate) {
    this.snackbar = new Snackbar();
    this.loginContainer = $(".login-manage__container");
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

  handleLogin = async (e: Event) => {
    e.preventDefault();
    const email = this.loginEmailInput.value;
    const password = this.loginPasswordInput.value;

    try {
      const { accessToken, user } = await requestLogin({ email, password });
      saveSessionStorage(KEY.ACCESS_TOKEN, accessToken);
      saveSessionStorage(KEY.USER_INFO, user);

      history.pushState({ path: "#purchase" }, null, "#purchase");
      this.convertTemplate("#purchase");
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_LOGIN);
    } catch ({ message }) {
      this.snackbar.show(message);
    }
  };

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
