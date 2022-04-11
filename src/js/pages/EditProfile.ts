import api from '../api';
import showSnackbar from '../components/Snackbar';
import router from '../router';
import template from '../template';
import {
  isPositiveName,
  isPositivePwdLength,
  isPwdLowerCase,
  isPwdUpperCase,
  isPwdSpecialChar,
  isPwdDigit,
  isSamePwd2,
} from './validator';

interface User {
  email: string;
  name: string;
  id: number;
}

export default class EditProfile {
  $headerTitle: HTMLElement;
  $contentsContainer: HTMLElement;
  $editProfileForm: HTMLFormElement;
  $editProfileEmail: HTMLInputElement;
  $editProfileName: HTMLFormElement;
  $editProfilePassword: HTMLInputElement;
  $editProfilePasswordCheck: HTMLInputElement;
  $nameNbr: HTMLElement;
  $pwdNbr: HTMLElement;
  $pwdLowercase: HTMLElement;
  $pwdUppercase: HTMLElement;
  $pwdSpecial: HTMLElement;
  $pwdDigit: HTMLElement;
  $pwdConfirm: HTMLElement;
  user: User;

  constructor() {
    this.$headerTitle = document.querySelector('#header-title');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$contentsContainer.insertAdjacentHTML('beforeend', template.editProfileContainer());
    this.$headerTitle.textContent = '회원 정보 수정';

    this.$editProfileForm = this.$contentsContainer.querySelector('#edit-profile-form');
    this.$editProfileEmail = this.$contentsContainer.querySelector('#edit-profile-email');
    this.$editProfileName = this.$contentsContainer.querySelector('#edit-profile-name');
    this.$editProfilePassword = this.$contentsContainer.querySelector('#edit-profile-password');
    this.$editProfilePasswordCheck = this.$contentsContainer.querySelector('#edit-profile-password-check');

    this.$nameNbr = this.$contentsContainer.querySelector('#name-nbr');
    this.$pwdNbr = this.$contentsContainer.querySelector('#pwd-nbr');
    this.$pwdLowercase = this.$contentsContainer.querySelector('#pwd-lowercase');
    this.$pwdUppercase = this.$contentsContainer.querySelector('#pwd-uppercase');
    this.$pwdSpecial = this.$contentsContainer.querySelector('#pwd-special');
    this.$pwdDigit = this.$contentsContainer.querySelector('#pwd-digit');
    this.$pwdConfirm = this.$contentsContainer.querySelector('#pwd-confirm');

    this.$contentsContainer.addEventListener('keydown', this.onKeyDownInput);
    this.$editProfileForm.addEventListener('submit', this.onSubmitLogin);

    this.user = JSON.parse(localStorage.getItem('user'));
    this.$editProfileEmail.value = this.user.email;
  }

  onKeyDownInput = (e: KeyboardEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const { keyCode } = e;
    const isSpacebar = keyCode === 32;

    if (isSpacebar) e.returnValue = false;
  };

  onSubmitLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const email = this.$editProfileEmail.value.trim();
    const name = this.$editProfileName.value.trim();
    const password = this.$editProfilePassword.value.trim();
    const password2 = this.$editProfilePasswordCheck.value.trim();

    try {
      this.checkAccountValidate(name, password, password2);

      const data = JSON.stringify({ email, name, password });

      api.putEditProfile({ id: this.user.id, data }).then(res => {
        const { email, name, id } = res;

        localStorage.setItem('user', JSON.stringify({ email, name, id }));
        router.to('#!/product-manage');
      });
    } catch (err) {
      showSnackbar(err.message);
    }
  };

  checkAccountValidate(name: string, pwd: string, pwd2: string) {
    const _isPositiveName = isPositiveName(name);
    const _isPositivePwdLength = isPositivePwdLength(pwd);
    const _isPwdLowerCase = isPwdLowerCase(pwd);
    const _isPwdUpperCase = isPwdUpperCase(pwd);
    const _isPwdSpecialChar = isPwdSpecialChar(pwd);
    const _isPwdDigit = isPwdDigit(pwd);
    const _isSamePwd2 = isSamePwd2(pwd, pwd2);

    this.$nameNbr.classList.toggle('hide', _isPositiveName);
    this.$pwdNbr.classList.toggle('hide', _isPositivePwdLength);
    this.$pwdLowercase.classList.toggle('hide', _isPwdLowerCase);
    this.$pwdUppercase.classList.toggle('hide', _isPwdUpperCase);
    this.$pwdSpecial.classList.toggle('hide', _isPwdSpecialChar);
    this.$pwdDigit.classList.toggle('hide', _isPwdDigit);
    this.$pwdConfirm.classList.toggle('hide', _isSamePwd2);

    const isError = [
      _isPositiveName,
      _isPositivePwdLength,
      _isPwdLowerCase,
      _isPwdUpperCase,
      _isPwdSpecialChar,
      _isPwdDigit,
      _isSamePwd2,
    ].some(v => !v);

    if (isError) {
      throw new Error('잘못 입력 했습니다.');
    }
  }
}
