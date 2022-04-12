import { $ } from '../../dom';
import { on } from '../../events';

import { getCurrentUser, setCurrentUser } from '../../auth';
import { ERROR_MESSAGE, MAIN_PAGE } from '../../constants';
import renderSnackBar from '../../snackbar';
import { userHTTPRequest } from '../../http';

export default class ModifyUserInfoComponent {
  private $userModifyForm = $('.user-modify-form');
  private $modifyEmailInput = $('.modify-email-input') as HTMLInputElement;
  private $modifyNameInput = $('.modify-name-input') as HTMLInputElement;
  private $modifyPasswordInput = $(
    '.modify-password-input'
  ) as HTMLInputElement;
  private $modifyPasswordConfirmInput = $(
    '.modify-password-confirm-input'
  ) as HTMLInputElement;

  constructor() {
    const { name, email } = getCurrentUser();

    this.$modifyEmailInput.value = email;
    this.$modifyNameInput.value = name;

    on(this.$userModifyForm, 'submit', this.onSubmitModifyUserInfo);
  }

  onSubmitModifyUserInfo = async (e) => {
    e.preventDefault();

    const { id: currentUserId, accessToken } = getCurrentUser();

    try {
      const password = this.$modifyPasswordInput.value;
      const passwordConfirm = this.$modifyPasswordConfirmInput.value;

      if (password !== passwordConfirm) {
        throw new Error(ERROR_MESSAGE.NOT_CONFIRMED_PASSWORD);
      }

      const userRequestReturn = await userHTTPRequest({
        path: `users/${currentUserId}`,
        method: 'PATCH',
        body: {
          name: this.$modifyNameInput.value,
          password: this.$modifyPasswordInput.value,
        },
      });

      const { email, name, id } = userRequestReturn;

      setCurrentUser({ accessToken, name, email, id });

      window.location.pathname = MAIN_PAGE;
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };
}
