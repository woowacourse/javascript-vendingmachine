import { setCurrentUser } from '../../auth';
import { MAIN_PAGE } from '../../constants';
import { $ } from '../../dom';
import { on } from '../../events';
import renderSnackBar from '../../snackbar';

export default class LoginComponent {
  private $loginForm = $('.login-form');
  private $emailInput = $('.login-email-input') as HTMLInputElement;
  private $passwordInput = $('.login-password-input') as HTMLInputElement;

  constructor() {
    on(this.$loginForm, 'submit', this.onLogin);
  }

  onLogin = async (e) => {
    e.preventDefault();
    const email = this.$emailInput.value;
    const password = this.$passwordInput.value;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();
      const { accessToken, user } = json;

      if (json === 'Cannot find user') {
        throw new Error(
          '유저를 찾을 수 없습니다. 이메일과 비밀번호를 다시 한번 확인해주세요'
        );
      }

      setCurrentUser({ accessToken, name: user.name, email: user.email });

      localStorage.setItem(
        'accessToken',
        JSON.stringify({ ...user, accessToken })
      );

      if (response.ok) {
        location.pathname = MAIN_PAGE;
      }
    } catch ({ message }) {
      renderSnackBar(message);
    }
  };
}
