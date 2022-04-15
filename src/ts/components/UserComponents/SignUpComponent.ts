import { requestRegister } from '../../api/api';
import { ERROR_MESSAGE } from '../../constants/errorMessage';
import { PATHNAME } from '../../constants/pathname';
import { SERVER_MESSAGE } from '../../constants/serverMessage';
import { SNACK_BAR_TYPE } from '../../constants/snackBar';
import SUCCESS_MESSAGE from '../../constants/successMessage';

import { $, emit, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';
import { RegisterUserInfo } from '../../types/userInfo';

import {
  checkValidName,
  checkValidPassword,
  checkValidEmail,
} from '../../validation/checkMemberShip';

export default class SignUpComponent {
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');
  private $signUpVerifyButton = $<HTMLButtonElement>(
    '.sign-up-form__verify-button'
  );

  private $signUpEmailInput = $<HTMLInputElement>('.sign-up-form__email-input');
  private $signUpNameInput = $<HTMLInputElement>('.sign-up-form__name-input');
  private $signUpPasswordInput = $<HTMLInputElement>(
    '.sign-up-form__password-input'
  );
  private $signUpPasswordConfirmInput = $<HTMLInputElement>(
    '.sign-up-form__password-confirm-input'
  );

  constructor() {
    on(this.$signUpVerifyButton, 'click', this.onClickSignUpVerifyButton);
  }

  onClickSignUpVerifyButton = async (event: SubmitEvent) => {
    event.preventDefault();

    const { value: signUpEmail } = this.$signUpEmailInput;
    const { value: signUpName } = this.$signUpNameInput;
    const { value: signUpPassword } = this.$signUpPasswordInput;
    const { value: signUpPasswordConfirm } = this.$signUpPasswordConfirmInput;

    try {
      checkValidName(signUpName);
      checkValidPassword(signUpPassword, signUpPasswordConfirm);
      checkValidEmail(signUpEmail);

      const registerUserInfo: RegisterUserInfo = {
        email: signUpEmail,
        name: signUpName,
        password: signUpPassword,
      };

      const response = await requestRegister(registerUserInfo);

      if (!response) return;

      this.$signUpEmailInput.value = '';
      this.$signUpNameInput.value = '';
      this.$signUpPasswordInput.value = '';
      this.$signUpPasswordConfirmInput.value = '';

      renderSnackBar(
        this.$snackBarContainer,
        SUCCESS_MESSAGE.DONE_SIGN_UP,
        SNACK_BAR_TYPE.SUCCESS
      );

      window.history.pushState({}, '', PATHNAME.SIGN_IN);
      emit(this.$signUpVerifyButton, '@signInChangeComponent');
    } catch ({ message }) {
      if (message === SERVER_MESSAGE.EMAIL_ALREADY_EXISTS) {
        message = ERROR_MESSAGE.EMAIL_ALREADY_EXIST;
      }

      renderSnackBar(this.$snackBarContainer, message, SNACK_BAR_TYPE.ERROR);
    }
  };
}
