import "./css/login.css";

class UserEditForm {
  constructor() {
    this.$editUserForm = document.querySelector("#edit-user-form");
    this.$editUserEmail = document.querySelector("#edit-user-email");
    this.$editUserName = document.querySelector("#edit-user-name");
    this.$editUserPassword = document.querySelector("#edit-user-password");
    this.$editUserPasswordConfirm = document.querySelector(
      "#edit-user-password-confirm"
    );
    this.$editUserForm.addEventListener("submit", this.onSubmit);
    this.user = JSON.parse(localStorage.getItem("user-info"));
    this.setEditUserInputValue();
  }

  setEditUserInputValue() {
    this.$editUserEmail.value = this.user.email;
    this.$editUserName.value = this.user.name;
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const password = this.$editUserPassword.value;
    const confirmPassword = this.$editUserPasswordConfirm.value;

    if (password !== confirmPassword) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/users/${this.user.id}`,
      {
        method: "PUT",
        body: new URLSearchParams(new FormData(this.$editUserForm)),
      }
    );

    const body = await response.json();

    if (!response.ok) {
      alert(body);
      return;
    }

    const user = {
      key: body.accessToken,
      name: body.name,
      id: body.id,
      email: body.email,
    };

    localStorage.setItem("user-info", JSON.stringify(user));
  };
}

new UserEditForm();
