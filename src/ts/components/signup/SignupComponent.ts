import { requestSignup } from "../../api";
import AuthManager from "../../mananger/authManager";
import { $ } from "../../utils/dom";
import { ConvertTemplate, HideHeader } from "../App";
import { signupTemplate } from "./signupTemplate";

export interface UserInfo {
  email: string;
  name: string;
  id: number;
}

class SignupComponent {
  signupContainer: HTMLElement;
  signupForm: HTMLFormElement;
  signupEmailInput: HTMLInputElement;
  signupNameInput: HTMLInputElement;
  signupPasswordInput: HTMLInputElement;
  signupPasswordCheckInput: HTMLInputElement;
  signupConfirmButton: HTMLButtonElement;

  constructor(
    private hideHeader: HideHeader,
    private convertTemplate: ConvertTemplate,
    private authManager: AuthManager,
  ) {
    this.signupContainer = $(".signup-manange__container");
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
      this.authManager.setAccessToken(accessToken);
      this.authManager.setUserInfo(user);

      history.pushState({ path: "#purchase" }, null, "#purchase");
      this.convertTemplate("#purchase");
    } catch ({ message }) {
      alert(message);
    }
  };

  show() {
    this.signupContainer.classList.remove("hide");
    this.hideHeader();
  }
}

export default SignupComponent;
