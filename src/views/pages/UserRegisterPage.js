import Component from '../../core/Component';
import { registerUser } from '../../auth/register';
import { setData } from '../../utils/storageUtil';
import { isPasswordDifferent } from '../../auth/validate';
import { showSnackBar } from '../../utils/domUtil';
import { ERROR_MESSAGE, NAME, PASSWORD } from '../../constant/constant';

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
          <input type="text" class="register-input styled-input" placeholder="이름을 입력해주세요" name="userName" minlength=${NAME.MIN_LENGTH} maxlength=${NAME.MAX_LENGTH} required>
          <label for="password">비밀번호</label>
          <input type="password" class="register-input styled-input" placeholder="비밀번호를 입력해주세요" name="password" pattern=${PASSWORD.PATTERN} required>
          <label for="password-check">비밀번호 확인</label>
          <input type="password" class="register-input styled-input" placeholder="비밀번호를 입력해주세요" name="passwordCheck" pattern=${PASSWORD.PATTERN} required>
          <button type="submit" class="register-button styled-button emphasized">확인</button>
        </form>
      </div>
      <div class="snackbar"></div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#register-form', async (event) => {
      event.preventDefault();

      const snackbar = this.querySelector('.snackbar');
      const { email, userName, password, passwordCheck } =
        event.target.elements;

      if (isPasswordDifferent(password.value, passwordCheck.value)) {
        showSnackBar(snackbar, ERROR_MESSAGE.CHECK_PASSWORD);

        return;
      }

      const response = await registerUser({
        email: email.value,
        name: userName.value,
        password: password.value,
      });

      if (!response.accessToken) {
        showSnackBar(snackbar, response);

        return;
      }

      setData('user', response);
      window.location.href = 'http://localhost:9000/';
    });
  }
}

customElements.define('user-register', UserRegisterPage);
