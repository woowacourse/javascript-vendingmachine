import { $ } from '../../dom';
import { on } from '../../events';
import { BASE_SERVER_URL, MAIN_PAGE } from '../../constants';
import { setCurrentUser } from '../../auth';

import renderSnackBar from '../../snackbar';

const checkValidUserReturn = (json) => {
  if (json === 'Cannot find user') {
    throw new Error('유저를 찾을 수 없습니다. 이메일을 다시 한번 확인해주세요');
  }
  if (json === 'Incorrect password') {
    throw new Error('비밀번호가 틀렸습니다. 다시 한번 확인해주세요');
  }
};

export default class LoginComponent {
  private $loginForm = $('.login-form');
  private $emailInput = $('.login-email-input') as HTMLInputElement;
  private $passwordInput = $('.login-password-input') as HTMLInputElement;

  constructor() {
    on(this.$loginForm, 'submit', this.onLogin);
  }

  onLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_SERVER_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.$emailInput.value,
          password: this.$passwordInput.value,
        }),
      });

      const json = await response.json();
      checkValidUserReturn(json);

      const {
        accessToken,
        user: { email, name, id },
      } = json;

      setCurrentUser({
        accessToken,
        name,
        email,
        id,
      });

      if (response.ok) {
        window.location.pathname = MAIN_PAGE;
      }
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };
}
