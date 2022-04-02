import { MESSAGE } from '../../constants';
import { request } from '../../domain/UserDomain/request';
import { showSnackbar } from '../../utils';
import { $, $$ } from '../../utils/dom';
import { basePath } from '../App';
import { viewPainter } from '../ViewPainter';

export default class SignInUI {
  private readonly $main = $('#main');
  private readonly $signIn = $('#sign-in');
  private readonly $signUp = $('#sign-up');
  private readonly userDomain;

  constructor(userDomain) {
    this.userDomain = userDomain;
    $('.sign-in__form').addEventListener('submit', this.submitHandler);
  }

  render() {
    this.$main.classList.add('hide');
    this.$signIn.classList.remove('hide');
    this.$signUp.classList.add('hide');

    $('#sign-in-email').focus();
  }

  private submitHandler = (e: SubmitEvent) => {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const email = (e.target.elements.namedItem('email') as HTMLInputElement)
      .value;
    const password = (
      e.target.elements.namedItem('password') as HTMLInputElement
    ).value;

    const user = { email, password };

    this.signIn(user);
  };

  private signIn(user) {
    request('signin', user)
      .then(response => {
        const { user: userInfo, accessToken } = response;
        this.userDomain.signIn(userInfo, accessToken);

        $$('.sign-in__input').forEach(($input: HTMLInputElement) => {
          $input.value = '';
        });
        showSnackbar(MESSAGE.SUCCESS_SIGNIN);
        viewPainter.renderUser(userInfo.name);
        viewPainter.renderMainUI(this.userDomain.isSignIn);
        history.replaceState({}, '', `${basePath}/`);
      })
      .catch(() => {
        showSnackbar(MESSAGE.FAIL_SIGNIN);
      });
  }
}
