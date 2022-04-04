import { MESSAGE } from '../../constants/message';
import { requestUpdate } from '../../domain/UserDomain/request';
import { validateUserInfo } from '../../domain/UserDomain/validator';
import { showSnackbar } from '../../utils';
import { $, $$ } from '../../utils/dom';
import { basePath } from '../App';
import { viewPainter } from '../ViewPainter';

export default class UserInfoEditUI {
  private readonly $main = $('#main');
  private readonly $signIn = $('#sign-in');
  private readonly $signUp = $('#sign-up');
  private readonly $userInfoEdit = $('#user-info-edit');
  private readonly userDomain;

  constructor(userDomain) {
    this.userDomain = userDomain;
    $('.user-info-edit__form').addEventListener('submit', this.submitHandler);
  }

  render() {
    this.$main.classList.add('hide');
    this.$signIn.classList.add('hide');
    this.$signUp.classList.add('hide');
    this.$userInfoEdit.classList.remove('hide');

    ($('#user-info-edit-email') as HTMLInputElement).value =
      this.userDomain.userInfo.email;
    $('#user-info-edit-name').focus();
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

    this.editUserInfo(user);
  };

  private editUserInfo(user: {
    email: string;
    name: string;
    password: string;
  }) {
    requestUpdate(user, this.userDomain.userInfo.id)
      .then(response => {
        this.userDomain.signIn(response);

        $$('.user-info-edit__input').forEach(($input: HTMLInputElement) => {
          $input.value = '';
        });
        const $selectBox = $('.select-box');
        $selectBox.classList.add('hide');
        $selectBox.classList.remove('active');

        showSnackbar(MESSAGE.SUCCESS_EDIT_USER_INFO);
        viewPainter.renderUserName(response.name);
        viewPainter.renderMainUI(this.userDomain.isSignIn);
        history.replaceState({}, '', `${basePath}/`);
      })
      .catch(() => {
        showSnackbar(MESSAGE.FAIL_EDIT_USER_INFO);
      });
  }
}
