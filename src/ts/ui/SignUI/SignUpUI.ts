import UserDomain from '../../domain/UserDomain/User';
import { basePath } from '../App';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { UserInfo } from '../../domain/types';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$, getNamedItem } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

export default class SignUpUI {
  private readonly userDomain: UserDomain;

  constructor(userDomain: UserDomain) {
    this.userDomain = userDomain;
    $('.sign-up__form').addEventListener('submit', this.submitHandler);
  }

  render() {
    $('#main').classList.add('hide');
    $('#sign-in').classList.add('hide');
    $('#sign-up').classList.remove('hide');
    $('#user-info-edit').classList.add('hide');

    $('#sign-up-email').focus();
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

    this.signUp(user);
  };

  private signUp(user: UserInfo) {
    this.userDomain
      .signUp(user)
      .then(() => {
        $$<HTMLInputElement>('.sign-up__input').forEach($input => {
          $input.value = '';
        });
        showSnackbar(USER_SIGN_MESSAGE.SUCCESS_SIGNUP);
        viewPainter.renderSignInUI();
        history.pushState({}, '', `${basePath}/signin`);
      })
      .catch(() => {
        showSnackbar(USER_SIGN_MESSAGE.FAIL_SIGNUP);
      });
  }
}
