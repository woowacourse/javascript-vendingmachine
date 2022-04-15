import { SERVER_URL } from '../constants/auth';
import { SnackBar } from './SnackBar';

export class SignUpPage {
  app: HTMLDivElement;
  snackBar: SnackBar;
  emailInput: HTMLInputElement;
  nameInput: HTMLInputElement;
  pwConfirmInput: HTMLInputElement;
  pwInput: HTMLInputElement;
  submitSignUpBtn: HTMLButtonElement;

  constructor(props) {
    this.app = props.app;
    this.snackBar = props.snackBar;
    this.selectDom();
    this.bindDom();
  }

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
      fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Access-Control-Allow-Origin': `${SERVER_URL}/signup`,
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.ok) {
          this.app.dispatchEvent(new CustomEvent('signUpOk'));
          this.snackBar.render('회원가입 되었습니다');
          return;
        }
        this.snackBar.render('회원가입에 실패하였습니다');
      });
    }
    this.snackBar.render('비밀번호와 비밀번호 확인은 동일해야 합니다');
  };
}
