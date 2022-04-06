import AuthStore from '../../domains/stores/AuthStore';
import { login } from '../../domains/Auth';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';
import { BASE_HASH } from '../../constants';

class Login extends CustomElement {
  template() {
    return `
      <form class="login-form">
        <fieldset>
          <label for="login-email">이메일</label>
          <input type="email" id="login-email" name="email" placeholder="woowacourse@gmail.com" required>
          <label for="login-password">비밀번호</label>
          <input type="password" id="login-password" name="password" placeholder="비밀번호를 입력해주세요" required>
          <button class="login-confirm-button">확인</button>
        </fieldset>
      </form>
      <p>아직 회원이 아니신가요? <span><a href="#!signup">회원가입</a></span></p>
    `;
  }

  setEvent() {
    $('.login-form').addEventListener('submit', this.handleLoginFormSubmit);
  }

  handleLoginFormSubmit = (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    login(email.value, password.value);
    AuthStore.instance.dispatch();

    this.initLoginInputs(email, password);
    window.location.hash = BASE_HASH;
  };

  initLoginInputs($email, $password) {
    $email.value = '';
    $password.value = '';
  }
}

customElements.define('log-in', Login);

export default Login;
