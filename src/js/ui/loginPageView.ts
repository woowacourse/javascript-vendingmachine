import { $, createElement } from "../util/dom";
import { on, emit } from "../util/event";
import { EVENT_TYPE } from "../constant";
import loginTemplate from "../template/login.template";

class LoginView {
  $page;
  $header;
  $formContainer;
  $emailInput;
  $passwordInput;
  init() {
    this.$page = $("#page");
    this.$header = $("#header");
    this.$page.replaceChildren();
    this.$header.replaceChildren();
    this.$formContainer = createElement(
      "form",
      { id: "login-form" },
      loginTemplate.input()
    );
    this.$emailInput = $("#email", this.$formContainer);
    this.$passwordInput = $("#password", this.$formContainer);

    this.$page.appendChild(this.$formContainer);
    this.$header.insertAdjacentHTML("beforeend", "로그인");
    this.bindEvent();
  }

  bindEvent() {
    on(this.$formContainer, "submit", this.submitHandler);
  }

  submitHandler = (e: Event) => {
    e.preventDefault();
    const email = this.$emailInput.value;
    const password = this.$passwordInput.value;

    emit<any>(EVENT_TYPE.LOGIN, {
      email,
      password,
    });
  };
}
export default LoginView;
