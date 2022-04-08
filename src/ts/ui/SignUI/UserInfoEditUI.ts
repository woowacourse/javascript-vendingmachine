import UserDomain from '../../domain/UserDomain/User';
import { basePath } from '../App';
import { UserInfo } from '../../domain/types';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$, getNamedItem } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

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

        const $selectBox = $('.select-box');
        $selectBox.classList.add('hide');
        $selectBox.classList.remove('active');

        showSnackbar(USER_SIGN_MESSAGE.SUCCESS_EDIT_USER_INFO);
        viewPainter.renderUserName(this.userDomain.userInfo.name);
        viewPainter.renderMainUI(this.userDomain.isSignIn);
        history.replaceState({}, '', `${basePath}/`);
      })
      .catch(() => {
        showSnackbar(USER_SIGN_MESSAGE.FAIL_EDIT_USER_INFO);
      });
  }
}
