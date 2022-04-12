import { setCurrentUser } from '../../auth';
import { ERROR_MESSAGE, MAIN_PAGE } from '../../constants';
import { $ } from '../../dom';
import { on } from '../../events';
import { userHTTPRequest } from '../../http';
import renderSnackBar from '../../snackbar';

export default class SignupComponent {
  private $signupForm = $('.signup-form');
  private $emailInput = $('.signup-email-input') as HTMLInputElement;
  private $nameInput = $('.signup-name-input') as HTMLInputElement;
  private $passwordInput = $('.signup-password-input') as HTMLInputElement;
  private $passwordConfirmInput = $(
    '.signup-password-confirm-input'
  ) as HTMLInputElement;

  constructor() {
    on(this.$signupForm, 'submit', this.onSignUp);
  }

  onSignUp = async (e) => {
    e.preventDefault();

    try {
      const password = this.$passwordInput.value;
      const passwordConfirm = this.$passwordConfirmInput.value;

      if (password !== passwordConfirm) {
        throw new Error(ERROR_MESSAGE.NOT_CONFIRMED_PASSWORD);
      }

      const userRequestReturn = await userHTTPRequest({
        path: 'register',
        method: 'POST',
        body: {
          name: this.$nameInput.value,
          email: this.$emailInput.value,
          password,
        },
      });

      const {
        accessToken,
        user: { email, name, id },
      } = userRequestReturn;

      setCurrentUser({ accessToken, name, email, id });

      window.location.pathname = MAIN_PAGE;
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };
}
