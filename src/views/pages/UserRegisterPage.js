import Component from '../../core/Component';
import { registerUser } from '../../auth/register';

class UserRegisterPage extends Component {
  template() {
    return `
      <div>
        <form id="register-form">
          <label for="email">이메일</label>
          <input type="email" placeholder="이메일 주소를 입력해주세요" name="email" required>
          <label for="user-name">이름</label>
          <input type="text" placeholder="이름을 입력해주세요" name="userName" minlength="2" maxlength="6" required>
          <label for="password">비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해주세요" name="password" pattern="^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]|[A-Z]).{8,}" required>
          <label for="password-check">비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 입력해주세요" name="passwordCheck" required>
          <button type="submit">확인</button>
        </form>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#register-form', async (event) => {
      event.preventDefault();

      const { email, userName, password, passwordCheck } =
        event.target.elements;

      if (password.value !== passwordCheck.value) {
        alert('패스워드를 확인해 주세요');

        return;
      }

      const response = await registerUser({
        email: email.value,
        name: userName.value,
        password: password.value,
      });
      if (!response.accessToken) {
        alert(response);

        return;
      }

      window.location.href = 'http://localhost:9000/';
    });
  }
}

customElements.define('user-register', UserRegisterPage);
