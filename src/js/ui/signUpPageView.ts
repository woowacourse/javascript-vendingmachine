import { $, createElement } from "../util/dom";
import { on, emit } from "../util/event";
import { EVENT_TYPE } from "../constant";
import signUpTemplate from "../template/signUp.template";

class SignUpView {
  $page;
  $formContainer;
  $emailInput;
  $nameInput;
  $passwordInput;
  init() {
    this.$page = $("#page");
    this.$page.replaceChildren();
    this.$formContainer = createElement(
      "form",
      { id: "signup-form" },
      signUpTemplate.input()
    );
    this.$emailInput = $("#email", this.$formContainer);
    this.$nameInput = $("#name", this.$formContainer);
    this.$passwordInput = $("#password", this.$formContainer);

    this.$page.appendChild(this.$formContainer);
    this.bindEvent();
  }

  bindEvent() {
    on(this.$formContainer, "submit", this.submitHandler);
  }

  submitHandler = (e: Event) => {
    e.preventDefault();
    const email = this.$emailInput.value;
    const name = this.$nameInput.value;
    const password = this.$passwordInput.value;

    emit<any>(EVENT_TYPE.SIGN_UP, {
      email,
      name,
      password,
    });
  };
}
export default SignUpView;
