import UserDomain from '../../domain/UserDomain/User';
import { basePath } from '../App';
import { requestSign } from '../../domain/UserDomain/request';
import { UserInfo } from '../../domain/types';
import { USER_SIGN_MESSAGE } from '../../constants/message';
import { showSnackbar } from '../../utils';
import { $, $$, getNamedItem } from '../../utils/dom';
import { viewPainter } from '../ViewPainter';

export default class SignInUI {
  private readonly userDomain: UserDomain;

  constructor(userDomain: UserDomain) {
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
    requestSign('signin', user)
      .then(response => {
        const { user: userInfo, accessToken } = response;
        this.userDomain.signIn(userInfo, accessToken);

        $$('.sign-in__input').forEach(($input: HTMLInputElement) => {
          $input.value = '';
        });
        showSnackbar(USER_SIGN_MESSAGE.SUCCESS_SIGNIN);
        viewPainter.renderUserUI(userInfo.name);
        viewPainter.renderMainUI(this.userDomain.isSignIn);
        history.replaceState({}, '', `${basePath}/`);
      })
      .catch(() => {
        showSnackbar(USER_SIGN_MESSAGE.FAIL_SIGNIN);
      });
  }
}
