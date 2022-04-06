import { SnackBar } from './SnackBar';

export class SignInPage {
  app: HTMLDivElement;
  snackBar: SnackBar;
  emailInput: HTMLInputElement;
  pwInput: HTMLInputElement;
  submitSignInBtn: HTMLButtonElement;
  signUpBtn: HTMLParagraphElement;

  constructor(props) {
    this.app = props.app;
    this.snackBar = props.snackBar;
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
          const userInfo = data.user;
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          this.app.dispatchEvent(new CustomEvent('signInOk'));
        });
      }
      if (!res.ok) {
        this.snackBar.render('올바른 이메일과 비밀번호를 입력해주세요');
      }
    });
  };
}
