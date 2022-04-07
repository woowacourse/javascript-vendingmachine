import Component from '../../core/Component';
import { auth } from '../../domains/Auth';
import { USER } from '../../configs/constants';

export default class ProfilePage extends Component {
  template() {
    const user = auth.useStore((state) => state.user);

    return `
      <header>
        <h1 class="title">회원 정보 수정</h1>
      </header>
      <form id="update-profile-form">
        <fieldset class="profile-fieldset">
          <legend hidden>회원 정보 수정</legend>
          <label for="profile-email"  class="description">이메일
            <input
              id="profile-email"
              name="email"
              type="email"
              class="profile-input styled-input"
              placeholder="이메일 주소를 입력해주세요."
              value="${user?.email}"
              maxlength="${USER.EMAIL.LENGTH.MAX}"
              disabled
              required
            >
          </label>
          <label for="profile-name" class="description">이름
            <input
              id="profile-name"
              name="name"
              type="text"
              class="profile-input styled-input"
              placeholder="이름을 입력해주세요."
              value="${user?.name}"
              minlength="${USER.NAME.LENGTH.MIN}"
              maxlength="${USER.NAME.LENGTH.MAX}"
              autofocus
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
              minlength="${USER.PASSWORD.LENGTH.MIN}"
              maxlength="${USER.PASSWORD.LENGTH.MAX}"
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
              minlength="${USER.PASSWORD.LENGTH.MIN}"
              maxlength="${USER.PASSWORD.LENGTH.MAX}"
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
      const passwordConfirm = event.target.querySelector(
        '[name="password-confirm"]'
      ).value;

      try {
        if (newUser.password !== passwordConfirm) {
          throw new Error('비밀번호가 다릅니다.');
        }

        await auth.updateProfile(updatedProfile);
      } catch (err) {
        document.querySelector('#snackbar').trigger(err.message);
      }
    });
  }
}

customElements.define('profile-page', ProfilePage);
