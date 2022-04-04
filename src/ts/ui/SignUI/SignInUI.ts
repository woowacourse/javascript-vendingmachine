import { basePath } from '../App';
import { requestSign } from '../../domain/UserDomain/request';
import { MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$ } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

export default class SignInUI {
  private readonly userDomain;

  constructor(userDomain) {
    this.userDomain = userDomain;
    $('.sign-in__form').addEventListener('submit', this.submitHandler);
  }

  render() {
    $('#main').classList.add('hide');
    $('#sign-in').classList.remove('hide');
    $('#sign-up').classList.add('hide');
    $('#user-info-edit').classList.add('hide');

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

  private signIn(user: { email: string; password: string }) {
    requestSign('signin', user)
      .then(response => {
        const { user: userInfo, accessToken } = response;
        this.userDomain.signIn(userInfo, accessToken);

        $$('.sign-in__input').forEach(($input: HTMLInputElement) => {
          $input.value = '';
        });
        showSnackbar(MESSAGE.SUCCESS_SIGNIN);
        viewPainter.renderUserUI(userInfo.name);
        viewPainter.renderMainUI(this.userDomain.isSignIn);
        history.replaceState({}, '', `${basePath}/`);
      })
      .catch(() => {
        showSnackbar(MESSAGE.FAIL_SIGNIN);
      });
  }
}
