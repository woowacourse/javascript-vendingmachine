import "./css/login";
import { ERROR_MESSAGE } from "./js/constant";
import isLogin from "./js/util/checkLogin";
import { addEvent } from "./js/util/event";
import { setLocalStorage } from "./js/util/localStorage";
import showSnackbar from "./js/util/snackbar";

class Login {
  constructor() {
    this.$loginEmailInput = document.querySelector("#login-email-input");
    this.$loginPasswordInput = document.querySelector("#login-password-input");
    this.$snackbar = document.querySelector("#snackbar");
    this.$loginForm = document.querySelector("#login-form");
    addEvent(this.$loginForm, "submit", this.onSubmit);
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (isLogin()) {
      showSnackbar(this.$snackbar, ERROR_MESSAGE.ALREADY_LOGIN, () => {
        location.href = "./";
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const email = this.$loginEmailInput.value;
    const password = this.$loginPasswordInput.value;

    const response = await fetch(
      "https://json-auth-server.herokuapp.com/login",
      {
        method: "POST",
        body: new URLSearchParams({
          email,
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
      key: body.accessToken,
      name: body.user.name,
      id: body.user.id,
      email: body.user.email,
    };

    setLocalStorage("user-info", user);
    location.href = "./";
  };
}

new Login();
