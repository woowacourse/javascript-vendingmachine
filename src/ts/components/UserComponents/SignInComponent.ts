import { requestSignIn } from '../../api/api';
import { setCookie } from '../../cookie/cookie';

import { checkValidEmail } from '../../validation/checkMemberShip';

import SUCCESS_MESSAGE from '../../constants/successMessage';
import { ERROR_MESSAGE } from '../../constants/errorMessage';

import { $, emit, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';
import { SignInUserInfo } from '../../types/userInfo';
import { COOKIE_ID } from '../../constants/cookie';
import { SNACK_BAR_TYPE } from '../../constants/snackBar';
import { SERVER_MESSAGE } from '../../constants/serverMessage';

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

  private onClickSignInButton = async (event: SubmitEvent) => {
    event.preventDefault();

    const { value: signInEmail } = this.$signInEmailInput;
    const { value: signInPassword } = this.$signInPasswordInput;

    try {
      checkValidEmail(signInEmail);

      const signInUserInfo: SignInUserInfo = {
        email: signInEmail,
        password: signInPassword,
      };

      const { accessToken, user } = await requestSignIn(signInUserInfo);

      if (!accessToken || !user) return;

      const userInfo = {
        id: user.id,
        name: user.name,
        accessToken,
      };

      setCookie(COOKIE_ID.USER, JSON.stringify(userInfo), 3600);

      this.$signInEmailInput.value = '';
      this.$signInPasswordInput.value = '';

      renderSnackBar(
        this.$snackBarContainer,
        SUCCESS_MESSAGE.DONE_SIGN_IN,
        SNACK_BAR_TYPE.SUCCESS
      );

      window.history.pushState({}, '', '/purchase-product');
      emit(this.$signInVerifyButton, '@purchaseProductChangeComponentWithUser');
    } catch ({ message }) {
      if (message === SERVER_MESSAGE.CANNOT_FIND_USER) {
        message = ERROR_MESSAGE.NOT_FOUND_EMAIL;
      }

      renderSnackBar(this.$snackBarContainer, message, SNACK_BAR_TYPE.ERROR);
    }
  };

  private onClickSignUpButton = (event: MouseEvent): void => {
    event.preventDefault();

    window.history.pushState({}, '', '/sign-up');
    emit(this.$signUpButton, '@signUpChangeComponent');
  };
}
