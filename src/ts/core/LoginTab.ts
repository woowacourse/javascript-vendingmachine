import { $ } from '../utils/dom';
import { Login } from '../declarations/coreDeclaration';
import VerifyValueValidation from '../validations/verifyValueValidation';
import { getLoginInfo } from '../utils/userInfoUtil';

class LoginTab implements Login {
  $login: Document;
  verifyValue: VerifyValueValidation;
  constructor(verifyValue: VerifyValueValidation) {
    this.verifyValue = verifyValue;
    this.$login = $('.login');
    $('#link', this.$login).addEventListener('click', this.handleLink);
    $('#login-confirm-button', this.$login).addEventListener('click', this.handleLogin.bind(this));
  }

  handleLogin(e: Event): void {
    const loginInfo = getLoginInfo();
    if (!this.verifyValue.verifyLoginInfo(loginInfo)) {
      return;
    }
    // 정보 로컬스토리지로
    // login된 걸로 상태변경
    // route 수정
    // index.js로
  }

  handleLink(): void {
    history.pushState({}, '', window.location.pathname + `#sign-up`);
    $('#app').classList.remove('manage', 'charge', 'buy', 'login', 'sign-up', 'edit-profile');
    $('#header').classList.remove('manage', 'charge', 'buy', 'login', 'sign-up', 'edit-profile');
    $('#app').classList.add('sign-up');
    $('#header').classList.add('sign-up');
  }
}

export default LoginTab;
