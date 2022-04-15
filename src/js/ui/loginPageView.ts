import { $, createElement } from "../util/dom";
import { on, emit } from "../util/event";
import { EVENT_TYPE } from "../constant";
import loginTemplate from "../template/login.template";
import { ILoginEvent } from "../type";
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
      { id: "login-form", class: "form" },
      loginTemplate.inputCollection()
    );
    this.$emailInput = $("#email", this.$formContainer);
    this.$passwordInput = $("#password", this.$formContainer);

    this.$page.appendChild(this.$formContainer);
    this.$header.insertAdjacentHTML("beforeend", "<h1>로그인</h1>");
    this.bindEvent();
  }

  bindEvent() {
    on(this.$formContainer, "submit", this.submitHandler);
  }

  submitHandler = (e: Event) => {
    e.preventDefault();
    const email = this.$emailInput.value;
    const password = this.$passwordInput.value;

    emit<ILoginEvent>(EVENT_TYPE.LOGIN, {
      email,
      password,
    });
  };
}
export default LoginView;
