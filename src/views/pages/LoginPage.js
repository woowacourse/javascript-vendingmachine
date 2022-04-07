import Component from '../../core/Component';
import '../components/Link';
import { auth } from '../../domains/Auth';
import { PAGES, USER } from '../../configs/constants';

export default class LoginPage extends Component {
  template() {
    return `
      <header>
        <h1 class="title">로그인</h1>
      </header>
      <div>
        <form id="login-form">
          <fieldset class="profile-fieldset">
            <legend hidden>로그인</legend>
            <label for="login-email"  class="description">이메일
              <input
                id="login-email"
                name="email"
                type="email"
                class="profile-input styled-input"
                placeholder="woowacourse@gmail.com"
                maxlength="${USER.EMAIL.LENGTH.MAX}"
                autofocus
                required
              >
            </label>
            <label for="login-password" class="description">비밀번호
              <input
                id="login-password"
                name="password"
                type="password"
                class="profile-input styled-input"
                placeholder="비밀번호를 입력해주세요."
                minlength="${USER.PASSWORD.LENGTH.MIN}"
                maxlength="${USER.PASSWORD.LENGTH.MAX}"
                required
              >
            </label>
            <button id="login-submit" class="styled-button emphasized profile-button" type="submit">확인</button>
          </fieldset>
        </form>
        <p class="description signup-guide">아직 회원이 아니신가요? <a-link id="signup-link" href="${PAGES.SIGNUP.PATH}" class="text-link">회원가입</a-link></p>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#login-form', async (event) => {
      event.preventDefault();

      const loginInfo = {
        email: event.target.querySelector('[name="email"]').value,
        password: event.target.querySelector('[name="password"]').value,
      };

      try {
        await auth.login(loginInfo);

        const state = {};
        window.history.pushState(state, '', PAGES.LANDING.PATH);
        dispatchEvent(new PopStateEvent('popstate', { state }));
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('login-page', LoginPage);
