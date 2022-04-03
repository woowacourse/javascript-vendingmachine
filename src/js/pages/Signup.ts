import router from '../router/index';
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

export default class Signup {
  $headerTitle: HTMLElement;
  $contentsContainer: HTMLElement;
  $signupForm: HTMLFormElement;
  $signupEmail: HTMLInputElement;
  $signupName: HTMLFormElement;
  $signupPassword: HTMLInputElement;
  $signupPasswordCheck: HTMLInputElement;
  $nameNbr: HTMLElement;
  $pwdNbr: HTMLElement;
  $pwdLowercase: HTMLElement;
  $pwdUppercase: HTMLElement;
  $pwdSpecial: HTMLElement;
  $pwdDigit: HTMLElement;
  $pwdConfirm: HTMLElement;

  constructor() {
    this.$headerTitle = document.querySelector('#header-title');
    this.$contentsContainer = document.querySelector('.contents-container');
  }

  render() {
    this.$contentsContainer.insertAdjacentHTML('beforeend', template.signupContainer());
    this.$headerTitle.textContent = '회원가입';

    this.$signupForm = this.$contentsContainer.querySelector('#signup-form');
    this.$signupEmail = this.$contentsContainer.querySelector('#signup-email');
    this.$signupName = this.$contentsContainer.querySelector('#signup-name');
    this.$signupPassword = this.$contentsContainer.querySelector('#signup-password');
    this.$signupPasswordCheck = this.$contentsContainer.querySelector('#signup-password-check');

    this.$nameNbr = this.$contentsContainer.querySelector('#name-nbr');
    this.$pwdNbr = this.$contentsContainer.querySelector('#pwd-nbr');
    this.$pwdLowercase = this.$contentsContainer.querySelector('#pwd-lowercase');
    this.$pwdUppercase = this.$contentsContainer.querySelector('#pwd-uppercase');
    this.$pwdSpecial = this.$contentsContainer.querySelector('#pwd-special');
    this.$pwdDigit = this.$contentsContainer.querySelector('#pwd-digit');
    this.$pwdConfirm = this.$contentsContainer.querySelector('#pwd-confirm');

    this.$contentsContainer.addEventListener('keydown', this.onKeyDownInput);
    this.$signupForm.addEventListener('submit', this.onSubmitLogin);
  }

  onKeyDownInput = (e: KeyboardEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const { keyCode } = e;
    const isSpacebar = keyCode === 32;

    if (isSpacebar) e.returnValue = false;
  };

  onSubmitLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const email = this.$signupEmail.value.trim();
    const name = this.$signupName.value.trim();
    const password = this.$signupPassword.value.trim();
    const password2 = this.$signupPasswordCheck.value.trim();

    try {
      this.checkAccountValidate(name, password, password2);

      const data = JSON.stringify({ email, name, password });
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      const res = await response.json();

      if (!response.ok) {
        throw new Error(res);
      }

      const { accessToken, user } = res;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      router.to('#!/product-manage');
    } catch (message) {
      alert(message);
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
