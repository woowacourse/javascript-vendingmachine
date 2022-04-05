import { $, emit, on } from '../../dom/domHelper';
import { getCookie } from '../../cookie/cookie';
import { requestUserInfo, requestEditInformation } from '../../api/api';
import {
  checkValidName,
  checkValidPassword,
} from '../../validation/checkMemberShip';
import renderSnackBar from '../../dom/snackBar';

export default class EditInformationComponent {
  private $snackBarContainer = $<HTMLElement>('.snack-bar-container');
  private $informationWrapper = $<HTMLUListElement>(
    '.membership-information-wrapper'
  );
  private $emailInput = $<HTMLInputElement>(
    '.membership-edit-form__email-input'
  );
  private $nameInput = $<HTMLInputElement>('.membership-edit-form__name-input');
  private $passwordInput = $<HTMLInputElement>(
    '.membership-edit-form__password-input'
  );
  private $passwordConfirmInput = $<HTMLInputElement>(
    '.membership-edit-form__password-confirm-input'
  );
  private $editVerifyButton = $<HTMLButtonElement>(
    '.membership-edit-form__verify-button'
  );

  constructor() {
    on(this.$editVerifyButton, 'click', this.onClickEditVerifyButton);

    on(
      this.$informationWrapper,
      '@loadUserInformation',
      this.loadUserInformation
    );
  }

  loadUserInformation = async () => {
    const user = getCookie('user') && JSON.parse(getCookie('user'));
    const { email, name } = await requestUserInfo(user.accessToken, user.id);

    this.$emailInput.value = email;
    this.$nameInput.value = name;
  };

  onClickEditVerifyButton = async (event: Event) => {
    event.preventDefault();

    const user = getCookie('user') && JSON.parse(getCookie('user'));

    const { value: email } = this.$emailInput;
    const { value: editName } = this.$nameInput;
    const { value: editPassword } = this.$passwordInput;
    const { value: editPasswordConfirm } = this.$passwordConfirmInput;

    try {
      checkValidName(editName);
      checkValidPassword(editPassword, editPasswordConfirm);

      await requestEditInformation(user.accessToken, {
        email,
        name: editName,
        password: editPassword,
        id: user.id,
      });

      this.$passwordInput.value = '';
      this.$passwordConfirmInput.value = '';
      window.history.pushState({}, '', '/purchase-product');
      emit(this.$editVerifyButton, '@editInformation');
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
