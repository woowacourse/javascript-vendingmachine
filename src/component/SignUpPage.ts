export class SignUpPage {
  app: HTMLDivElement;
  emailInput: HTMLInputElement;
  nameInput: HTMLInputElement;
  pwConfirmInput: HTMLInputElement;
  pwInput: HTMLInputElement;
  submitSignUpBtn: HTMLButtonElement;
  signUpBtn: HTMLParagraphElement;

  constructor() {
    this.selectDom();
    this.bindDom();
  }

  render = () => {};

  selectDom() {
    this.emailInput = document.querySelector('.sign-up-email-input');
    this.nameInput = document.querySelector('.sign-up-name-input');
    this.pwInput = document.querySelector('.sign-up-pw-input');
    this.pwConfirmInput = document.querySelector('.sign-up-pw-confirm-input');
    this.submitSignUpBtn = document.querySelector('.submit-sign-up-button');
  }

  bindDom() {
    this.submitSignUpBtn.addEventListener('click', this.handleSignUp);
  }

  handleSignUp = () => {
    if (this.pwInput.value === this.pwConfirmInput.value) {
      const userData = {
        email: this.emailInput.value,
        name: this.nameInput.value,
        password: this.pwInput.value,
      };
      console.log(userData);
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => console.log(res));
    }
  };
}
