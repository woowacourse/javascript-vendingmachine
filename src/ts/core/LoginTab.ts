import { $ } from '../utils/dom';
import { Login } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getLoginInfo } from '../utils/userInfoUtil';
import { loginnedMode } from '../utils/loginUtil';
import { displaySnackbar } from '../utils/snackbar';

class LoginTab implements Login {
  $login: Document;
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    this.$login = $('.login');
    $('#link', this.$login).addEventListener('click', this.handleLink);
    $('#login-confirm-button', this.$login).addEventListener('click', this.handleLogin.bind(this));
  }

  async handleLogin(): Promise<void> {
    const loginInfo = getLoginInfo();
    const { email, password } = loginInfo;
    if (!this.verifyValue.verifyLoginInfo(loginInfo)) {
      return;
    }
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

      if (response.ok) {
        localStorage.setItem('accessToken', JSON.stringify({ ...user, accessToken }));
        loginnedMode();
      } else {
        displaySnackbar(json);
      }
    } catch (error) {
      displaySnackbar(error);
    }
  }

  handleLink(): void {
    history.pushState({}, '', window.location.pathname + `#signup`);
    $('#app').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    $('#header').classList.remove('manage', 'charge', 'buy', 'login', 'signup', 'edit-profile');
    $('#app').classList.add('signup');
    $('#header').classList.add('signup');
  }
}

export default LoginTab;
