import { $ } from '../../dom';
import { on } from '../../events';

import { getCurrentUser, setCurrentUser } from '../../auth';
import { MAIN_PAGE } from '../../constants';
import renderSnackBar from '../../snackbar';

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
      if (
        this.$modifyPasswordInput.value !==
        this.$modifyPasswordConfirmInput.value
      ) {
        throw new Error(
          '비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요.'
        );
      }
      const response = await fetch(
        `http://localhost:3000/users/${currentUserId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: this.$modifyNameInput.value,
            password: this.$modifyPasswordInput.value,
          }),
        }
      );

      const json = await response.json();
      const { email, name, id } = json;

      setCurrentUser({ accessToken, name, email, id });
      if (response.ok) {
        location.pathname = MAIN_PAGE;
      }
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };
}
