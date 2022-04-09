import "./css/login";
import { ERROR_MESSAGE } from "./js/constant";
import { addEvent } from "./js/util/event";
import showSnackbar from "./js/util/snackbar";
import { isValidName, isValidPassword } from "./js/util/validator";

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

    if (!this.checkValidSignupInfo({ name, password, confirmPassword })) {
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

  checkValidSignupInfo = ({ name, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      showSnackbar(this.$snackbar, ERROR_MESSAGE.NOT_MATCH_PASSWORD);
      return false;
    }

    if (!isValidName(name)) {
      showSnackbar(this.$snackbar, ERROR_MESSAGE.VALID_NAME);
      return false;
    }

    if (!isValidPassword(password)) {
      showSnackbar(this.$snackbar, ERROR_MESSAGE.VALID_PASSWORD);
      return false;
    }

    return true;
  };
}

new SignUp();
