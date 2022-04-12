import { requestUserInfo, requestEditInformation } from '../../api/api';
import { getCookie } from '../../cookie/cookie';

import {
  checkValidName,
  checkValidPassword,
} from '../../validation/checkMemberShip';
import SUCCESS_MESSAGE from '../../constants/successMessage';

import { $, emit, on } from '../../dom/domHelper';
import renderSnackBar from '../../dom/snackBar';
import { EditUserInfo } from '../../types/userInfo';

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
    const { email, name } = await requestUserInfo(user);

    this.$emailInput.value = email;
    this.$nameInput.value = name;
  };

  onClickEditVerifyButton = async (event: SubmitEvent) => {
    event.preventDefault();

    const user = getCookie('user') && JSON.parse(getCookie('user'));

    const { value: email } = this.$emailInput;
    const { value: editName } = this.$nameInput;
    const { value: editPassword } = this.$passwordInput;
    const { value: editPasswordConfirm } = this.$passwordConfirmInput;

    try {
      checkValidName(editName);
      checkValidPassword(editPassword, editPasswordConfirm);

      const editUserInfo: EditUserInfo = {
        user: {
          email,
          name: editName,
          password: editPassword,
          id: user.id,
        },
        accessToken: user.accessToken,
      };

      await requestEditInformation(editUserInfo);

      this.$passwordInput.value = '';
      this.$passwordConfirmInput.value = '';

      renderSnackBar(
        this.$snackBarContainer,
        SUCCESS_MESSAGE.DONE_EDIT_USER_INFORMATION,
        'success'
      );

      window.history.pushState({}, '', '/purchase-product');
      emit(this.$editVerifyButton, '@purchaseProductChangeComponentWithUser');
    } catch ({ message }) {
      renderSnackBar(this.$snackBarContainer, message, 'error');
    }
  };
}
