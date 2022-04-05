export class SignInPage {
  app: HTMLDivElement;
  emailInput: HTMLInputElement;
  pwInput: HTMLInputElement;
  submitSignInBtn: HTMLButtonElement;
  signUpBtn: HTMLParagraphElement;

  constructor(prop) {
    this.app = prop;
    this.selectDom();
    this.bindDom();
  }

  render = () => {};

  selectDom() {
    this.emailInput = document.querySelector('.sign-in-email-input');
    this.pwInput = document.querySelector('.sign-in-pw-input');
    this.submitSignInBtn = document.querySelector('.sign-in-submit-button');
  }

  bindDom() {
    this.submitSignInBtn.addEventListener('click', this.handleSignIn);
  }

  handleSignIn = () => {
    const userData = {
      email: this.emailInput.value,
      password: this.pwInput.value,
    };
    fetch('http://localhost:3000/signin', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const token = data.accessToken;
          const userInfo = data.user;

          sessionStorage.setItem('accessToken', token);
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

          //로그인 후 page render
          this.app.dispatchEvent(new CustomEvent('signInOk'));
        });
      }
    });
  };
}
