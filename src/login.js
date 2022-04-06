import "./css/login";
import isLogin from "./js/util/checkLogin";
import { setLocalStorage } from "./js/util/localStorage";

class Login {
  constructor() {
    this.$loginEmailInput = document.querySelector("#login-email-input");
    this.$loginPasswordInput = document.querySelector("#login-password-input");
    this.$snackbar = document.querySelector("#snackbar");
    this.$loginForm = document.querySelector("#login-form");
    this.$loginForm.addEventListener("submit", this.onSubmit);
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    if (isLogin()) {
      this.$snackbar.innerText = "이미 로그인이 되어있습니다";
      this.$snackbar.classList.toggle("show");
      setTimeout(() => {
        this.$snackbar.classList.toggle("show");
        location.href = "./";
      }, 1000);
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
      this.$snackbar.innerText = body;
      this.$snackbar.classList.toggle("show");
      setTimeout(() => {
        this.$snackbar.classList.toggle("show");
      }, 1000);
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
