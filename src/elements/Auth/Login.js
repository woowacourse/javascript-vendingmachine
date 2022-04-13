import AuthStore from '../../domains/stores/AuthStore';
import { AUTH_ACTION, createAction } from '../../domains/actions';
import { login } from '../../domains/Auth';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';
import { BASE_HASH, ERROR_MESSAGE, JSON_AUTH_SERVER_ERROR_MESSAGE } from '../../constants';

class Login extends CustomElement {
  template() {
    return `
      <h1>로그인</h1>
      <form class="login-form auth-form">
        <fieldset>
          <label for="login-email">이메일</label>
          <input type="email" id="login-email" name="email" placeholder="woowacourse@gmail.com" required>
          <label for="login-password">비밀번호</label>
          <input type="password" id="login-password" name="password" placeholder="비밀번호를 입력해주세요" minLength="4" required>
          <button class="login-confirm-button">확인</button>
        </fieldset>
      </form>
      <p>아직 회원이 아니신가요? <span><a href="#!signup" class="signup-button">회원가입</a></span></p>
    `;
  }

  setEvent() {
    $('.login-form').addEventListener('submit', this.handleLoginFormSubmit);
  }

  handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      await this.loginAdministrator(email, password);
      this.initLoginInputs(email, password);
    } catch (error) {
      if (error.message === JSON_AUTH_SERVER_ERROR_MESSAGE.CANNOT_FIND_USER) {
        alert(ERROR_MESSAGE.AUTH.CANNOT_FIND_USER);
      }
      if (error.message === JSON_AUTH_SERVER_ERROR_MESSAGE.INCORRECT_PASSWORD) {
        alert(ERROR_MESSAGE.AUTH.INCORRECT_PASSWORD);
      }
    }
  };

  async loginAdministrator($email, $password) {
    await login($email.value, $password.value);
    AuthStore.instance.dispatch(createAction(AUTH_ACTION.LOGIN));

    this.initLoginInputs($email, $password);
    window.location.hash = BASE_HASH;
  }

  initLoginInputs($email, $password) {
    $email.value = '';
    $password.value = '';
  }
}

customElements.define('log-in', Login);

export default Login;
