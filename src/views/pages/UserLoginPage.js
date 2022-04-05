import Component from '../../core/Component';
import { loginUser } from '../../auth/login';
import { showSnackBar } from '../../utils/domUtil';
import { globalStore } from '../../domains/GlobalStore';

class UserLoginPage extends Component {
  template() {
    const { isloggedin } = this.props;
    const login = JSON.parse(isloggedin);

    if (login) {
      return `<p>이미 로그인 하셨습니다</p>`;
    }

    return `
      <header>
        <h1 class="title">로그인</h1>
      </header>
      <div>
        <form id="login-form" class="login-form">
          <label for="email">이메일</label>
          <input id="login-email" class="login-input styled-input" type="email" placeholder="woowacourse@gmail.com" name="email" required>
          <label for="password">비밀번호</label>
          <input id="login-password" class="login-input styled-input" type="password" placeholder="비밀번호를 입력해주세요" name="password" required>
          <button type="submit" class="login-confirm-button styled-button emphasized">확인</button>
        </form>
        <p>아직 회원이 아니신가요? <a id="register" class="register">회원가입</a></p>
      </div>
      <div class="snackbar"></div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#login-form', async (event) => {
      event.preventDefault();

      const { email, password } = event.target.elements;

      const response = await loginUser({
        email: email.value,
        password: password.value,
      });

      if (!response.accessToken) {
        showSnackBar(response);

        return;
      }

      const to = '/';
      const state = { path: to };

      window.history.pushState(state, '', to);
      globalStore.login(response);
    });

    this.addEvent('click', '#register', () => {
      const to = '/register';
      const state = { path: to };
      window.history.pushState(state, '', to);
      globalStore.changeLocation(to);
    });
  }
}

customElements.define('user-login', UserLoginPage);
