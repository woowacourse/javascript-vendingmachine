import "./css/login";

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
    this.$signupForm.addEventListener("submit", this.onSubmit);
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const password = this.$signupPassword.value;
    const confirmPassword = this.$signupPasswordConfirm.value;

    if (password !== confirmPassword) {
      return;
    }

    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      body: new URLSearchParams(new FormData(this.$signupForm)),
    });
    const body = await response.json();

    if (!response.ok) {
      this.$snackbar.innerText = body;
      this.$snackbar.classList.toggle("show");
      setTimeout(() => {
        this.$snackbar.classList.toggle("show");
      }, 1000);
      return;
    }

    location.href = "./login.html";
  };
}

new SignUp();
