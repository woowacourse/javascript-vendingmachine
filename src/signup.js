import "./css/login";
import { addEvent } from "./js/util/event";
import showSnackbar from "./js/util/snackbar";

class SignUp {
  constructor() {
    this.$signupForm = document.querySelector("#signup-form");
    this.$signupEmail = document.querySelector("#signup-email");
    this.$signupName = document.querySelector("#signup-name");
    this.$signupPassword = document.querySelector("#signup-password");
    this.$snackbar = document.querySelector("#snackbar");
    this.$signupPasswordConfirm = document.querySelector(
      "#signup-password-confirm"
    );
    addEvent(this.$signupForm, "submit", this.onSubmit);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const email = this.$signupEmail.value;
    const name = this.$signupName.value;
    const password = this.$signupPassword.value;
    const confirmPassword = this.$signupPasswordConfirm.value;

    if (password !== confirmPassword) {
      return;
    }

    const response = await fetch(
      "https://json-auth-server.herokuapp.com/register",
      {
        method: "POST",
        body: new URLSearchParams({
          name,
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

    location.href = "./login.html";
  };
}

new SignUp();
