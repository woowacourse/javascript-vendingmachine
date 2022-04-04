import Component from '../../core/Component';
import { registerUser } from '../../auth/register';
import { setData } from '../../utils/commons';
import { isPasswordDifferent } from '../../auth/validate';

class UserRegisterPage extends Component {
  template() {
    const { isloggedin } = this.props;
    const login = JSON.parse(isloggedin);

    if (login) {
      return `<p>이미 로그인 하셨습니다</p>`;
    }

    return `
      <header>
        <h1 class="title">회원가입</h1>
      </header>
      <div>
        <form id="register-form" class="register-form">
          <label for="email">이메일</label>
          <input type="email" class="register-input styled-input" placeholder="이메일 주소를 입력해주세요" name="email" required>
          <label for="user-name">이름</label>
          <input type="text" class="register-input styled-input" placeholder="이름을 입력해주세요" name="userName" minlength="2" maxlength="6" required>
          <label for="password">비밀번호</label>
          <input type="password" class="register-input styled-input" placeholder="비밀번호를 입력해주세요" name="password" pattern="^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^*+=-]|[A-Z]).{8,}" required>
          <label for="password-check">비밀번호 확인</label>
          <input type="password" class="register-input styled-input" placeholder="비밀번호를 입력해주세요" name="passwordCheck" required>
          <button type="submit" class="register-button styled-button emphasized">확인</button>
        </form>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#register-form', async (event) => {
      event.preventDefault();

      const { email, userName, password, passwordCheck } =
        event.target.elements;

      if (isPasswordDifferent(password.value, passwordCheck.value)) {
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

      setData('user', response);
      window.location.href = 'http://localhost:9000/';
    });
  }
}

customElements.define('user-register', UserRegisterPage);
