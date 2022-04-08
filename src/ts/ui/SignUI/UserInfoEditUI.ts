import UserDomain from '../../domain/UserDomain/User';
import { UserInfo } from '../../domain/types';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$, getNamedItem } from '../../utils/dom';
import { goToNextPage } from './common';

export default class UserInfoEditUI {
  private readonly userDomain: UserDomain;

  constructor(userDomain: UserDomain) {
    this.userDomain = userDomain;
    $('.user-info-edit__form').addEventListener('submit', this.submitHandler);
  }

  render() {
    $('#main').classList.add('hide');
    $('#sign-in').classList.add('hide');
    $('#sign-up').classList.add('hide');
    $('#user-info-edit').classList.remove('hide');

    $<HTMLInputElement>('#user-info-edit-email').value =
      this.userDomain.userInfo.email;
    $('#user-info-edit-name').focus();
  }

  private submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

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
        $$<HTMLInputElement>('.user-info-edit__input').forEach($input => {
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
