import { $ } from "../../utils/dom";
import { INFOMATION_MESSAGES, KEY } from "../../utils/constants";
import { saveSessionStorage } from "../../utils/sessionStorage";

import { requestSignup } from "../../api";
import { signupTemplate } from "./signupTemplate";
import { ConvertTemplate, HideHeader } from "../App";
import Snackbar from "../Snackbar";

class SignupComponent {
  signupContainer: HTMLElement;
  signupForm: HTMLFormElement;
  signupEmailInput: HTMLInputElement;
  signupNameInput: HTMLInputElement;
  signupPasswordInput: HTMLInputElement;
  signupPasswordCheckInput: HTMLInputElement;
  signupConfirmButton: HTMLButtonElement;
  snackbar: Snackbar;

  constructor(private hideHeader: HideHeader, private convertTemplate: ConvertTemplate) {
    this.snackbar = new Snackbar();
    this.signupContainer = $(".signup-manage__container");
    this.signupContainer.replaceChildren();
    this.signupContainer.insertAdjacentHTML("beforeend", signupTemplate());

    this.signupForm = $(".signup-form");
    this.signupEmailInput = $(".signup-form__email-input");
    this.signupNameInput = $(".signup-form__name-input");
    this.signupPasswordInput = $(".signup-form__password-input");
    this.signupPasswordCheckInput = $(".signup-form__password-input--check");
    this.signupConfirmButton = $(".signup-form__confirm-button");

    this.signupForm.addEventListener("submit", this.handleSignup);
  }

  handleSignup = async (e: Event) => {
    e.preventDefault();
    const email = this.signupEmailInput.value;
    const name = this.signupNameInput.value;
    const password = this.signupPasswordInput.value;
    const passwordCheck = this.signupPasswordCheckInput.value;

    try {
      const { accessToken, user } = await requestSignup({ email, name, password, passwordCheck });
      saveSessionStorage(KEY.ACCESS_TOKEN, accessToken);
      saveSessionStorage(KEY.USER_INFO, user);

      history.pushState({ path: "#purchase" }, null, "#purchase");
      this.convertTemplate("#purchase");
      this.snackbar.show(INFOMATION_MESSAGES.SUCCESS_SIGNUP);
    } catch ({ message }) {
      this.snackbar.show(message);
    }
  };

  show() {
    this.signupContainer.classList.remove("hide");
    this.hideHeader();
  }
}

export default SignupComponent;
