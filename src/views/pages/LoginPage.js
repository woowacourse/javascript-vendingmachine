import Component from '../../core/Component';
import '../components/Link';

export default class LoginPage extends Component {
  template() {
    return `
      <header>
        <h1 class="title">로그인</h1>
      </header>
      <form>
        <fieldset class="profile-fieldset">
          <legend hidden>로그인</legend>
          <label for="login-email"  class="description">이메일
            <input id="login-email" name="email" class="profile-input styled-input" placeholder="woowacourse@gmail.com">
          </label>
          <label for="login-password" class="description">비밀번호
            <input id="login-password" name="password" class="profile-input styled-input" placeholder="비밀번호를 입력해주세요.">
          </label>
          <button class="styled-button emphasized profile-button" type="submit">확인</button>
        </fieldset>
      </form>
      <p class="description">아직 회원이 아니신가요? <a-link href="/signup" class="text-link">회원가입</a-link></p>
    `;
  }
}

customElements.define('login-page', LoginPage);
