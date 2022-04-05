import { $, emit, on } from '../../dom/domHelper';
import { requestRegister } from '../../api/api';
import renderSnackBar from '../../dom/snackBar';
import {
  checkValidSignUpName,
  checkValidSignUpPassword,
  checkValidEmail,
} from '../../validation/checkMemberShip';

export default class SignUpComponent {
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

  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');

  constructor() {
    on(this.$signUpVerifyButton, 'click', this.onClickSignUpVerifyButton);
  }

  onClickSignUpVerifyButton = async (event: Event) => {
    event.preventDefault();
    const { value: signUpEmail } = this.$signUpEmailInput;
    const { value: signUpName } = this.$signUpNameInput;
    const { value: signUpPassword } = this.$signUpPasswordInput;
    const { value: signUpPasswordConfirm } = this.$signUpPasswordConfirmInput;

    try {
      checkValidSignUpName(signUpName);
      checkValidSignUpPassword(signUpPassword, signUpPasswordConfirm);
      checkValidEmail(signUpEmail);

      await requestRegister(signUpEmail, signUpName, signUpPassword);

      this.$signUpEmailInput.value = '';
      this.$signUpNameInput.value = '';
      this.$signUpPasswordInput.value = '';
      this.$signUpPasswordConfirmInput.value = '';

      window.history.pushState({}, '', '/sign-in');
      emit(this.$signUpVerifyButton, '@renderSignInComponent');
    } catch ({ message }) {
      if (message === 'Email already exists') {
        message =
          '이미 가입된 이메일 주소입니다. 회원가입을 하셨을 경우 로그인해 주세요.';
      }

      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
