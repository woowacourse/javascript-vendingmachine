import UserDomain from '../../domain/UserDomain/User';
import { UserInfo } from '../../domain/types';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$, getNamedItem } from '../../utils/dom';
import { goToNextPage } from './common';

export default class SignInUI {
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

    this.makeSignInPage();

    $('#sign-email').focus();
  }

  makeSignInPage() {
    this.$signForm.dataset.type = 'sign-in';

    $('.sign__title').textContent = '로그인';
    $('#sign-email').removeAttribute('readonly');
    [
      $('label[for=sign-name]'),
      $('#sign-name'),
      $('label[for=sign-confirm-password]'),
      $('#sign-confirm-password'),
    ].forEach($element => {
      $element.classList.add('hide');
    });
    $('#sign-in__link').classList.remove('hide');
  }

  private submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;
    if (e.target.dataset.type !== 'sign-in') return;

    const email = getNamedItem<HTMLInputElement>(
      e.target.elements,
      'email',
    ).value;
    const password = getNamedItem<HTMLInputElement>(
      e.target.elements,
      'password',
    ).value;

    const user = { email, password };

    this.signIn(user);
  };

  private signIn(user: UserInfo) {
    this.userDomain
      .signIn(user)
      .then(() => {
        $$<HTMLInputElement>('.sign__input').forEach($input => {
          $input.value = '';
        });
        showSnackbar(USER_SIGN_MESSAGE.SUCCESS_SIGNIN);

        goToNextPage(
          'signIn',
          this.userDomain.userInfo.name,
          this.userDomain.isSignIn,
        );
      })
      .catch(() => {
        showSnackbar(USER_SIGN_MESSAGE.FAIL_SIGNIN);
      });
  }
}
