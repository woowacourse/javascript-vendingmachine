import CustomElement from '../../abstracts/CustomElement';
import { ERROR_MESSAGE, JSON_AUTH_SERVER_ERROR_MESSAGE } from '../../constants';
import { signup } from '../../domains/Auth';
import { $ } from '../../utils';
import { checkSignupValidation } from '../../validators';

class Signup extends CustomElement {
  template() {
    return `
      <h1>회원가입</h1>
      <form class="signup-form auth-form">
        <fieldset>
          <label for="signup-email">이메일</label>
          <input type="email" id="signup-email" name="email" placeholder="이메일 주소를 입력해주세요" required>
          <label for="signup-name">이름</label>
          <input id="signup-name" name="name" placeholder="이름을 입력해주세요" minLength=2 maxLength=6 required>
          <label for="signup-password">비밀번호</label>
          <input type="password" id="signup-password" name="password" placeholder="비밀번호를 입력해주세요" required>
          <label for="signup-password-confirm">비밀번호 확인</label>
          <input type="password" id="signup-password-confirm" name="passwordConfirm" placeholder="비밀번호를 입력해주세요" required>
          <button class="signup-confirm-button">확인</button>
        </fieldset>
      </form>
    `;
  }

  setEvent() {
    $('.signup-form').addEventListener('submit', this.handleSignupFormSubmit);
  }

  handleSignupFormSubmit = async (event) => {
    event.preventDefault();

    const { email, name, password, passwordConfirm } = event.target.elements;

    try {
      await this.registerAdministrator(email, name, password, passwordConfirm);
      this.initSignupInputs(email, name, password, passwordConfirm);
    } catch (error) {
      if (error.message === JSON_AUTH_SERVER_ERROR_MESSAGE.EMAIL_ALREADY_EXISTS) {
        alert(ERROR_MESSAGE.AUTH.EMAIL_ALREADY_EXISTS);
        return;
      }
      alert(error.message);
    }
  };

  async registerAdministrator($email, $name, $password, $passwordConfirm) {
    const userName = $name.value.trim();

    checkSignupValidation(userName, $password.value, $passwordConfirm.value);

    await signup($email.value, userName, $password.value);

    this.initSignupInputs($email, $name, $password, $passwordConfirm);
    window.history.back();
  }

  initSignupInputs($email, $name, $password, $passwordConfirm) {
    $email.value = '';
    $name.value = '';
    $password.value = '';
    $passwordConfirm.value = '';
  }
}

customElements.define('sign-up', Signup);

export default Signup;
