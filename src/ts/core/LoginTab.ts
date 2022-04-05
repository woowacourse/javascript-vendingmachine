import { $ } from '../utils/dom';
import { Login } from '../declarations/coreDeclaration';

class LoginTab implements Login {
  $login: Document;
  constructor() {
    this.$login = $('.login');
    $('#link', this.$login).addEventListener('click', this.handleLink);
    $('#login-confirm-button', this.$login).addEventListener('click', this.handleLogin);
  }

  handleLogin(e: Event): void {
    e.preventDefault();
    console.log('Login');
    // 값 검증 -> 성공할 시,
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
