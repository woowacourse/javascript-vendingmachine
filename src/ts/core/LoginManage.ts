import { $ } from '../utils/dom';
import { Login } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getLoginInfo } from '../utils/userInfoUtil';
import { loginnedMode } from '../utils/loginUtil';
import { showSnackbar } from '../utils/snackbar';
import { baseUrl, loginUrl } from '../constants';
import { fetchUtil } from '../utils/fetchUtil';

class LoginManage implements Login {
  $login: Document;
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    this.$login = $('.login');
    $('#login-confirm-button', this.$login).addEventListener('click', this.handleLogin.bind(this));
  }

  async handleLogin(): Promise<void> {
    const loginInfo = getLoginInfo();
    const { email, password } = loginInfo;
    if (!this.verifyValue.verifyLoginInfo(loginInfo)) {
      return;
    }
    try {
      const response = await fetchUtil(loginUrl, 'POST', { email, password });
      const json = await response.json();
      const { accessToken, user } = json;

      if (response.ok) {
        localStorage.setItem('accessToken', JSON.stringify({ ...user, accessToken }));
        loginnedMode();
      } else {
        showSnackbar(json);
      }
    } catch (error) {
      showSnackbar(error);
    }
  }
}

export default LoginManage;
