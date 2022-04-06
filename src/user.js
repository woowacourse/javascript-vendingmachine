import "./css/login.css";
import { ERROR_MESSAGE } from "./js/constant";
import isLogin from "./js/util/checkLogin";
import { addEvent } from "./js/util/event";
import { setLocalStorage } from "./js/util/localStorage";
import showSnackbar from "./js/util/snackbar";

class UserEditForm {
  constructor() {
    this.$editUserForm = document.querySelector("#edit-user-form");
    this.$editUserEmail = document.querySelector("#edit-user-email");
    this.$editUserName = document.querySelector("#edit-user-name");
    this.$editUserPassword = document.querySelector("#edit-user-password");
    this.$editUserPasswordConfirm = document.querySelector(
      "#edit-user-password-confirm"
    );
    this.$snackbar = document.querySelector("#snackbar");

    addEvent(this.$editUserForm, "submit", this.onSubmit);
    this.user = JSON.parse(localStorage.getItem("user-info"));
    this.checkLoginStatus();

    this.setEditUserInputValue();
  }

  checkLoginStatus() {
    if (!isLogin()) {
      showSnackbar(this.$snackbar, ERROR_MESSAGE.MUST_LOGIN, () => {
        location.href = "./";
      });
    }
  }

  setEditUserInputValue() {
    this.$editUserEmail.value = this.user.email;
    this.$editUserName.value = this.user.name;
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const name = this.$editUserName.value;
    const password = this.$editUserPassword.value;
    const confirmPassword = this.$editUserPasswordConfirm.value;

    if (password !== confirmPassword) {
      return;
    }

    const response = await fetch(
      `https://json-auth-server.herokuapp.com/users/${this.user.id}`,
      {
        method: "PATCH",
        body: new URLSearchParams({
          name,
          email: this.user.email,
          password,
        }),
      }
    );

    const body = await response.json();

    if (!response.ok) {
      showSnackbar(this.$snackbar, body);
      return;
    }

    const user = {
      key: this.user.key,
      name: body.name,
      id: body.id,
      email: body.email,
    };

    setLocalStorage("user-info", user);
    location.href = "./";
  };
}

new UserEditForm();
