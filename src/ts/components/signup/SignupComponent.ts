import { $ } from "../../utils/dom";
import { HideAppTitle, HideLoginButton } from "../App";
import { signupTemplate } from "./signupTemplate";

class SignupComponent {
  signupContainer: HTMLElement;

  constructor(private hideAppTitle: HideAppTitle, private hideLoginButton: HideLoginButton) {
    this.signupContainer = $(".signup-manange__container");
    this.signupContainer.replaceChildren();
    this.signupContainer.insertAdjacentHTML("beforeend", signupTemplate());
  }

  show() {
    this.signupContainer.classList.remove("hide");
    this.hideAppTitle();
    this.hideLoginButton();
  }
}

export default SignupComponent;
