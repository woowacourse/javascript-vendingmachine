import Component from '../../core/Component';

export default class SignupPage extends Component {
  template() {
    return `
      <header>
        <h1 class="title">회원가입</h1>
      </header>
      <form>
        <fieldset class="profile-fieldset">
          <legend hidden>회원가입</legend>
          <label for="profile-email"  class="description">이메일
            <input id="profile-email" name="email" class="profile-input styled-input" placeholder="woowacourse@gmail.com" disabled>
          </label>
          <label for="profile-name" class="description">이름
            <input id="profile-name" name="name" class="profile-input styled-input" placeholder="우테코">
          </label>
          <label for="profile-password" class="description">비밀번호
            <input id="profile-password" name="password" class="profile-input styled-input" placeholder="비밀번호를 입력해주세요.">
          </label>
          <label for="profile-password-confirm" class="description">비밀번호 확인
            <input id="profile-password-confirm" name="confirm-password" class="profile-input styled-input" placeholder="비밀번호를 입력해주세요.">
          </label>
          <button class="styled-button emphasized profile-button" type="submit">확인</button>
        </fieldset>
      </form>
    `;
  }
}

customElements.define('signup-page', SignupPage);
