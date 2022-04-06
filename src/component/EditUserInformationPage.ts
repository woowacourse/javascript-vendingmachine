import { UserInfo } from '../interfaces/interface';
import { SnackBar } from './SnackBar';

export class EditUserInformationPage {
  app: HTMLDivElement;
  user: UserInfo;
  snackBar: SnackBar;
  emailInput: HTMLInputElement;
  nameInput: HTMLInputElement;
  pwConfirmInput: HTMLInputElement;
  pwInput: HTMLInputElement;
  submitEditBtn: HTMLButtonElement;
  signUpBtn: HTMLParagraphElement;

  constructor(props) {
    this.app = props.app;
    this.snackBar = props.snackBar;
    this.selectDom();
    this.bindDom();
  }

  setUser() {
    this.user = JSON.parse(sessionStorage.getItem('userInfo'));
    this.emailInput.placeholder = this.user.email;
    this.nameInput.value = this.user.name;
  }

  selectDom() {
    this.emailInput = document.querySelector('.edit-email-input');
    this.nameInput = document.querySelector('.edit-name-input');
    this.pwInput = document.querySelector('.edit-pw-input');
    this.pwConfirmInput = document.querySelector('.edit-pw-confirm-input');
    this.submitEditBtn = document.querySelector('.submit-edit-button');
  }

  bindDom() {
    this.submitEditBtn.addEventListener('click', this.handleEdit);
  }

  handleEdit = () => {
    if (this.pwInput.value === this.pwConfirmInput.value) {
      const newUserData = {
        email: this.emailInput.placeholder,
        name: this.nameInput.value,
        password: this.pwInput.value,
        id: this.user.id,
      };
      fetch(`http://localhost:3000/users/${this.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(newUserData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        if (res.ok) {
          sessionStorage.setItem('userInfo', JSON.stringify(newUserData));
          this.app.dispatchEvent(new CustomEvent('editInformationOk'));
          this.snackBar.render('회원정보 수정완료');
          return;
        }
        this.snackBar.render('회원정보 수정에 실패하였습니다');
      });
      return;
    }
    this.snackBar.render('비밀번호와 비밀번호 확인은 동일해야합니다.');
  };
}
