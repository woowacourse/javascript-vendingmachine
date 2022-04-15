import { $, createElement } from "../util/dom";
import { on, emit } from "../util/event";
import userInfoTemplate from "../template/userInfo.template";
import { EVENT_TYPE } from "../constant";
import { IUpdateUserEvent } from "../type";

class UserInfoPageView {
  $page;
  $header;
  $formContainer;

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
      {
        id: "userInfo-form",
        class: "form",
      },
      ""
    );

    this.$page.appendChild(this.$formContainer);
    this.$header.insertAdjacentHTML("beforeend", `<h1>회원 정보 수정</h1>`);
    this.bindEvent();
  }

  bindEvent() {
    on(this.$formContainer, "submit", this.submitHandler);
  }

  submitHandler = (e: Event) => {
    e.preventDefault();
    const name = this.$nameInput.value;
    const password = this.$passwordInput.value;
    const confirmPassword = this.$confirmPasswordInput.value;

    emit<IUpdateUserEvent>(EVENT_TYPE.UPDATE_USER, {
      name,
      password,
      confirmPassword,
    });
  };

  renderForm(email, name) {
    this.$formContainer.insertAdjacentHTML(
      "beforeend",
      userInfoTemplate.inputCollection(email, name)
    );

    this.$nameInput = $("#name", this.$formContainer);
    this.$passwordInput = $("#password", this.$formContainer);
    this.$confirmPasswordInput = $("#confirm-password", this.$formContainer);
  }
}

export default UserInfoPageView;
