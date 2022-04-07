import { basePath } from '../App';
import { requestSign } from '../../domain/UserDomain/request';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { UserInfo } from '../../domain/types';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$ } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

export default class SignUpUI {
  constructor() {
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

    const email = (e.target.elements.namedItem('email') as HTMLInputElement)
      .value;
    const name = (e.target.elements.namedItem('name') as HTMLInputElement)
      .value;
    const password = (
      e.target.elements.namedItem('password') as HTMLInputElement
    ).value;
    const confirmPassword = (
      e.target.elements.namedItem('confirm-password') as HTMLInputElement
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
    requestSign('signup', user)
      .then(() => {
        $$('.sign-up__input').forEach(($input: HTMLInputElement) => {
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
