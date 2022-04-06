import Component from '../../core/Component';
import { auth } from '../../domains/Auth';

export default class SignupPage extends Component {
  template() {
    return `
      <header>
        <h1 class="title">회원가입</h1>
      </header>
      <form id="signup-form">
        <fieldset class="profile-fieldset">
          <legend hidden>회원가입</legend>
          <label for="profile-email"  class="description">이메일
            <input
              id="profile-email"
              name="email"
              type="email"
              class="profile-input styled-input"
              placeholder="woowacourse@gmail.com"
              maxlength="40"
              autofocus
              required
            >
          </label>
          <label for="profile-name" class="description">이름
            <input
              id="profile-name"
              name="name"
              type="text"
              class="profile-input styled-input"
              placeholder="우테코"
              minlength="2"
              maxlength="6"
              required
            >
          </label>
          <label for="profile-password" class="description">비밀번호
            <input
              id="profile-password"
              name="password"
              type="password"
              class="profile-input styled-input"
              placeholder="비밀번호를 입력해주세요."
              minlength="8"
              maxlength="30"
              required
            >
          </label>
          <label for="profile-password-confirm" class="description">비밀번호 확인
            <input
              id="profile-password-confirm"
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
    this.addEvent('submit', '#signup-form', async (event) => {
      event.preventDefault();

      const newUser = {
        email: event.target.querySelector('[name="email"]').value,
        name: event.target.querySelector('[name="name"]').value,
        password: event.target.querySelector('[name="password"]').value,
      };

      try {
        await auth.signup(newUser);

        const state = {};
        window.history.pushState(state, '', '/');
        dispatchEvent(new PopStateEvent('popstate', { state }));
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('signup-page', SignupPage);
