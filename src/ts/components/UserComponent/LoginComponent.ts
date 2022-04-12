import { $ } from '../../dom';
import { on } from '../../events';
import { ERROR_MESSAGE, MAIN_PAGE } from '../../constants';
import { setCurrentUser } from '../../auth';

import renderSnackBar from '../../snackbar';
import { userHTTPRequest } from '../../http';

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
      const userRequestReturn = await userHTTPRequest({
        path: 'login',
        method: 'POST',
        body: {
          email: this.$emailInput.value,
          password: this.$passwordInput.value,
        },
      });

      const {
        accessToken,
        user: { email, name, id },
      } = userRequestReturn;

      setCurrentUser({
        accessToken,
        name,
        email,
        id,
      });

      window.location.pathname = MAIN_PAGE;
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };
}
