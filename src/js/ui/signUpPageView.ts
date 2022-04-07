import { $, createElement } from "../util/dom";
import { on, emit } from "../util/event";
import { EVENT_TYPE } from "../constant";
import signUpTemplate from "../template/signUp.template";
import { ISignUpEvent } from "../type";

class SignUpView {
  $page;
  $header;
  $formContainer;
  $emailInput;
  $nameInput;
  $passwordInput;
  $confirmPasswordInput;
  init() {
    this.$page = $("#page");
    this.$header = $("#header");
    this.$page.replaceChildren();
    this.$header.replaceChildren();

    this.$formContainer = createElement(
      "form",
      { id: "signup-form", class: "form" },
      signUpTemplate.input()
    );
    this.$emailInput = $("#email", this.$formContainer);
    this.$nameInput = $("#name", this.$formContainer);
    this.$passwordInput = $("#password", this.$formContainer);
    this.$confirmPasswordInput = $("#confirm-password", this.$formContainer);

    this.$page.appendChild(this.$formContainer);
    this.$header.insertAdjacentHTML("beforeend", "<h1>회원가입</h1>");
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
    const confirmPassword = this.$confirmPasswordInput.value;

    emit<ISignUpEvent>(EVENT_TYPE.SIGN_UP, {
      email,
      name,
      password,
      confirmPassword,
    });
  };
}
export default SignUpView;
