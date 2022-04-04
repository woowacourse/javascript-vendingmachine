import { MESSAGE } from '../../constants/message';
import { requestSign } from '../../domain/UserDomain/request';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { showSnackbar } from '../../utils';
import { $, $$ } from '../../utils/dom';
import { basePath } from '../App';
import { viewPainter } from '../ViewPainter';

export default class SignUpUI {
  private readonly $main = $('#main');
  private readonly $signIn = $('#sign-in');
  private readonly $signUp = $('#sign-up');
  private readonly $userInfoEdit = $('#user-info-edit');

  constructor() {
    $('.sign-up__form').addEventListener('submit', this.submitHandler);
  }

  render() {
    this.$main.classList.add('hide');
    this.$signIn.classList.add('hide');
    this.$signUp.classList.remove('hide');
    this.$userInfoEdit.classList.add('hide');

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

  private signUp(user: { email: string; name: string; password: string }) {
    requestSign('signup', user)
      .then(() => {
        $$('.sign-up__input').forEach(($input: HTMLInputElement) => {
          $input.value = '';
        });
        showSnackbar(MESSAGE.SUCCESS_SIGNUP);
        viewPainter.renderSignInUI();
        history.pushState({}, '', `${basePath}/signin`);
      })
      .catch(() => {
        showSnackbar(MESSAGE.FAIL_SIGNUP);
      });
  }
}
