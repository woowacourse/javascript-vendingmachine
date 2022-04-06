import Component from '../../core/Component';
import { auth } from '../../domains/Auth';

export default class ProfilePage extends Component {
  template() {
    const { email, name } = auth.useStore((state) => state.user);

    return `
      <header>
        <h1 class="title">회원 정보 수정</h1>
      </header>
      <form id="update-profile-form">
        <fieldset class="profile-fieldset">
          <legend hidden>회원가입</legend>
          <label for="signup-email"  class="description">이메일
            <input
              id="signup-email"
              name="email"
              type="email"
              class="profile-input styled-input"
              placeholder="이메일 주소를 입력해주세요."
              value="${email}"
              maxlength="40"
              disabled
              required
            >
          </label>
          <label for="signup-name" class="description">이름
            <input
              id="signup-name"
              name="name"
              type="text"
              class="profile-input styled-input"
              placeholder="이름을 입력해주세요."
              value="${name}"
              minlength="2"
              maxlength="6"
              autofocus
              required
            >
          </label>
          <label for="signup-password" class="description">비밀번호
            <input
              id="signup-password"
              name="password"
              type="password"
              class="profile-input styled-input"
              placeholder="비밀번호를 입력해주세요."
              minlength="8"
              maxlength="30"
              required
            >
          </label>
          <label for="signup-password-confirm" class="description">비밀번호 확인
            <input
              id="signup-password-confirm"
              name="password-confirm"
              type="password"
              class="profile-input styled-input"
              placeholder="비밀번호를 입력해주세요."
              minlength="8"
              maxlength="30"
              required
            >
          </label>
          <button class="styled-button emphasized profile-button" type="submit">확인</button>
        </fieldset>
      </form>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#update-profile-form', async (event) => {
      event.preventDefault();

      const updatedProfile = {
        name: event.target.querySelector('[name="name"]').value,
        password: event.target.querySelector('[name="password"]').value,
      };

      try {
        await auth.updateProfile(updatedProfile);
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('profile-page', ProfilePage);
