import api from '../api';
import showSnackbar from '../components/Snackbar';
import router from '../router';
import template from '../template';
import { validateAccount } from './validator';

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
  $nameLength: HTMLElement;
  $pwdMinLength: HTMLElement;
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

    this.$nameLength = this.$contentsContainer.querySelector('#name-length');
    this.$pwdMinLength = this.$contentsContainer.querySelector('#pwd-min-length');
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

    const isSpacebar = e.key === ' ';

    if (isSpacebar) e.preventDefault();
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

      api
        .putEditProfile({ id: this.user.id, data })
        .then(res => {
          const { email, name, id } = res;

          localStorage.setItem('user', JSON.stringify({ email, name, id }));
          router.to('#!/product-manage');
        })
        .catch(err => {
          showSnackbar(err.message);
        });
    } catch (err) {
      showSnackbar(err.message);
    }
  };

  checkAccountValidate(name: string, pwd: string, pwdCheck: string) {
    const validationAccount = validateAccount(name, pwd, pwdCheck);
    const {
      validateNameLength,
      validatePwdLength,
      validatePwdLowerCase,
      validatePwdUpperCase,
      validatePwdSpecialChar,
      validatePwdDigit,
      validateSamePwdCheck,
    } = validationAccount;

    this.$nameLength.classList.toggle('hide', validateNameLength);
    this.$pwdMinLength.classList.toggle('hide', validatePwdLength);
    this.$pwdLowercase.classList.toggle('hide', validatePwdLowerCase);
    this.$pwdUppercase.classList.toggle('hide', validatePwdUpperCase);
    this.$pwdSpecial.classList.toggle('hide', validatePwdSpecialChar);
    this.$pwdDigit.classList.toggle('hide', validatePwdDigit);
    this.$pwdConfirm.classList.toggle('hide', validateSamePwdCheck);

    const isError = Object.values(validationAccount).includes(false);

    if (isError) {
      throw new Error('잘못 입력 했습니다.');
    }
  }
}
