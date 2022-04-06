import Component from '../../core/Component';

export default class ProfilePage extends Component {
  template() {
    return `
      <header>
        <h1 class="title">회원 정보 수정</h1>
      </header>
      <form>
        <fieldset class="profile-fieldset">
          <legend hidden>회원가입</legend>
          <label for="signup-email"  class="description">이메일
            <input id="signup-email" name="email" class="profile-input styled-input" placeholder="이메일 주소를 입력해주세요." disabled>
          </label>
          <label for="signup-name" class="description">이름
            <input id="signup-name" name="name" class="profile-input styled-input" placeholder="이름을 입력해주세요.">
          </label>
          <label for="signup-password" class="description">비밀번호
            <input id="signup-password" name="password" class="profile-input styled-input" placeholder="비밀번호를 입력해주세요.">
          </label>
          <label for="signup-password-confirm" class="description">비밀번호 확인
            <input id="signup-password-confirm" name="confirm-password" class="profile-input styled-input" placeholder="비밀번호를 입력해주세요.">
          </label>
          <button class="styled-button emphasized profile-button" type="submit">확인</button>
        </fieldset>
      </form>
    `;
  }
}

customElements.define('profile-page', ProfilePage);
