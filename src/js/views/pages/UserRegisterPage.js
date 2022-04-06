import Component from '../../core/Component';
import { registerUser } from '../../auth';
import { isPasswordDifferent } from '../../auth/validate';
import { showSnackBar } from '../../utils/domUtil';
import { ERROR_MESSAGE, NAME, PASSWORD, PAGE } from '../../constant';
import { globalStore } from '../../domains/GlobalStore';

class UserRegisterPage extends Component {
  template() {
    const loginState = globalStore.useStore((state) => state.loginState);
    const login = loginState.isLoggedIn;

    if (login) {
      return `<p>이미 로그인 하셨습니다</p>`;
    }

    return `
      <header>
        <h1 class="title">회원가입</h1>
      </header>
      <section>
        <form id="register-form" class="register-form">
          <label for="email">이메일</label>
          <input type="email" class="register-input styled-input" placeholder="이메일 주소를 입력해주세요" name="email" required>
          <label for="user-name">이름</label>
          <input type="text" class="register-input styled-input" placeholder="이름을 입력해주세요" name="userName" minlength=${NAME.MIN_LENGTH} maxlength=${NAME.MAX_LENGTH} required>
          <label for="password">비밀번호</label>
          <input type="password" class="register-input styled-input" placeholder="비밀번호를 입력해주세요" name="password" pattern=${PASSWORD.PATTERN} required>
          <small id="validate-password-text" class="input-check-text" hidden>8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.</small>
          <label for="password-check">비밀번호 확인</label>
          <input type="password" class="register-input styled-input" placeholder="비밀번호를 입력해주세요" name="passwordCheck" pattern=${PASSWORD.PATTERN} required>
          <small id="password-check-text" class="input-check-text" hidden>비밀번호가 일치하지 않습니다.</small>
          <button type="submit" class="register-button styled-button emphasized">확인</button>
        </form>
      </section>
      <div class="snackbar"></div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#register-form', async (event) => {
      event.preventDefault();

      const { email, userName, password, passwordCheck } =
        event.target.elements;

      if (isPasswordDifferent(password.value, passwordCheck.value)) {
        showSnackBar(ERROR_MESSAGE.CHECK_PASSWORD);

        return;
      }

      const response = await registerUser({
        email: email.value,
        name: userName.value,
        password: password.value,
      });

      if (!response.accessToken) {
        showSnackBar(response);

        return;
      }

      const to = PAGE.ITEM_PURCHASE.PATH;
      const state = { path: to };

      window.history.pushState(state, '', to);
      globalStore.login(response);
    });

    this.addEvent('keyup', 'input[name=password]', () => {
      const { value } = this.querySelector('input[name=password]');
      const regex = new RegExp(PASSWORD.PATTERN, 'g');
      if (!regex.test(value)) {
        this.querySelector('#validate-password-text').hidden = false;
      } else {
        this.querySelector('#validate-password-text').hidden = true;
      }
    });

    this.addEvent('keyup', 'input[name=passwordCheck]', () => {
      const password = this.querySelector('input[name=password]').value;
      const passwordCheck = this.querySelector(
        'input[name=passwordCheck]'
      ).value;
      if (password !== passwordCheck) {
        this.querySelector('#password-check-text').hidden = false;
      } else {
        this.querySelector('#password-check-text').hidden = true;
      }
    });
  }
}

customElements.define('user-register', UserRegisterPage);
