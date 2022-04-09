import UserDomain from '../../domain/UserDomain/User';
import { UserInfo } from '../../domain/types';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$, getNamedItem } from '../../utils/dom';
import { goToNextPage } from './common';

export default class UserInfoEditUI {
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

    $<HTMLInputElement>('#sign-email').value = this.userDomain.userInfo.email;

    this.makeUserInfoEditPage();

    $('#sign-name').focus();
  }

  makeUserInfoEditPage() {
    this.$signForm.dataset.type = 'user-info-edit';

    $('.sign__title').textContent = '회원 정보 수정';
    $('#sign-email').setAttribute('readonly', '');
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
    if (e.target.dataset.type !== 'user-info-edit') return;

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

    this.editUserInfo(user);
  };

  private editUserInfo(user: UserInfo) {
    this.userDomain
      .editUserInfo(user)
      .then(() => {
        $$<HTMLInputElement>('.sign__input').forEach($input => {
          $input.value = '';
        });
        showSnackbar(USER_SIGN_MESSAGE.SUCCESS_EDIT_USER_INFO);

        const $selectBox = $('.select-box');
        $selectBox.classList.add('hide');
        $selectBox.classList.remove('active');

        goToNextPage(
          'editUserInfo',
          this.userDomain.userInfo.name,
          this.userDomain.isSignIn,
        );
      })
      .catch(() => {
        showSnackbar(USER_SIGN_MESSAGE.FAIL_EDIT_USER_INFO);
      });
  }
}
