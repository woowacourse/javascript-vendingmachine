import { setCurrentUser } from '../../auth';
import { MAIN_PAGE } from '../../constants';
import { $ } from '../../dom';
import { on } from '../../events';
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
      const email = this.$emailInput.value;
      const name = this.$nameInput.value;
      const password = this.$passwordInput.value;
      const passwordConfirm = this.$passwordConfirmInput.value;

      if (password !== passwordConfirm) {
        throw new Error(
          '비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요.'
        );
      }

      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const { accessToken, user } = await response.json();

        setCurrentUser({ accessToken, name: user.name, email: user.email });

        location.pathname = MAIN_PAGE;
      }
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };
}
