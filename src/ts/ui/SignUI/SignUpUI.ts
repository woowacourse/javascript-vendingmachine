import UserDomain from '../../domain/UserDomain/User';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { UserInfo } from '../../domain/types';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$, getNamedItem } from '../../utils/dom';
import { goToNextPage } from './common';

export default class SignUpUI {
  private readonly userDomain: UserDomain;
  private readonly $signForm: HTMLFormElement;

  constructor(userDomain: UserDomain) {
    this.userDomain = userDomain;
    this.$signForm = $('.sign__form');
    this.$signForm.addEventListener('submit', this.submitHandler);
  }

  render() {
    $('#main').classList.add('hide');
    $('#sign').classList.remove('hide');

    this.makeSignUpPage();

    $('#sign-email').focus();
  }

  makeSignUpPage() {
    this.$signForm.dataset.type = 'sign-up';

    $('.sign__title').textContent = '회원가입';
    $('#sign-email').removeAttribute('readonly');
    [
      $('label[for=sign-name]'),
      $('#sign-name'),
      $('label[for=sign-confirm-password]'),
      $('#sign-confirm-password'),
    ].forEach($element => {
      $element.classList.remove('hide');
    });
    $('#sign-in__link').classList.add('hide');
  }

  private submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;
    if (e.target.dataset.type !== 'sign-up') return;

    const email = getNamedItem<HTMLInputElement>(
      e.target.elements,
      'email',
    ).value;
    const name = getNamedItem<HTMLInputElement>(
      e.target.elements,
      'name',
    ).value;
    const password = getNamedItem<HTMLInputElement>(
      e.target.elements,
      'password',
    ).value;
    const confirmPassword = getNamedItem<HTMLInputElement>(
      e.target.elements,
      'confirm-password',
    ).value;

    const user = { email, name, password };

    try {
      validateUserInfo(user, confirmPassword);
    } catch ({ message }) {
      showSnackbar(message);
      return;
    }

    this.signUp(user);
  };

  private signUp(user: UserInfo) {
    this.userDomain
      .signUp(user)
      .then(() => {
        $$<HTMLInputElement>('.sign__input').forEach($input => {
          $input.value = '';
        });
        showSnackbar(USER_SIGN_MESSAGE.SUCCESS_SIGNUP);

        goToNextPage('signUp');
      })
      .catch(() => {
        showSnackbar(USER_SIGN_MESSAGE.FAIL_SIGNUP);
      });
  }
}
