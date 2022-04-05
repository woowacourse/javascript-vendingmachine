import { $, emit, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';
import { checkValidEmail } from '../../validation/checkMemberShip';
import { requestSignIn } from '../../api/api';
import { setCookie } from '../../cookie/cookie';

export default class SignInComponent {
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');
  private $signUpButton = $<HTMLAnchorElement>(
    '.sign-in-section__sign-up-button'
  );
  private $signInVerifyButton = $<HTMLButtonElement>(
    '.sign-in-form__verify-button'
  );
  private $signInEmailInput = $<HTMLInputElement>('.sign-in-form__email-input');
  private $signInPasswordInput = $<HTMLInputElement>(
    '.sign-in-form__password-input'
  );

  constructor() {
    on(this.$signUpButton, 'click', this.onClickSignUpButton);
    on(this.$signInVerifyButton, 'click', this.onClickSignInButton);
  }

  private onClickSignInButton = async (event: Event) => {
    event.preventDefault();

    const { value: signInEmail } = this.$signInEmailInput;
    const { value: signInPassword } = this.$signInPasswordInput;

    try {
      checkValidEmail(signInEmail);

      const { accessToken, user } = await requestSignIn(
        signInEmail,
        signInPassword
      );

      setCookie(
        'user',
        JSON.stringify({
          id: user.id,
          name: user.name,
          accessToken,
        }),
        {
          'max-age': 3600,
        }
      );

      this.$signInEmailInput.value = '';
      this.$signInPasswordInput.value = '';

      window.history.pushState({}, '', '/purchase-product');
      emit(this.$signInVerifyButton, '@membershipPurchaseProduct');
    } catch ({ message }) {
      if (message === 'Cannot find user') {
        message =
          '존재하지 않는 이메일입니다. 이메일을 확인 후 다시 로그인 해주세요.';
      }

      console.log(message);
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };

  private onClickSignUpButton = (event: Event): void => {
    event.preventDefault();

    window.history.pushState({}, '', '/sign-up');
    emit(this.$signUpButton, '@signUpChangeComponent');
  };
}
