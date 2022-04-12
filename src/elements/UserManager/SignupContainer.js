import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils/dom';
import { checkNewUserInfoValidation } from '../../validators';
import { signup } from '../../utils/auth';
import AuthStateaStoreInstance from '../../domains/stores/AuthStateStore';
import { AUTH_ACTION } from '../../domains/actions';
import showSnackbar from '../../utils/showSnackbar';

class SignupContainer extends CustomElement {
  template() {
    return `
      <h1>회원 가입</h1>
      <form class="signup-form">
        <label for="signup-email-input">이메일</label>
        <input type="email" id="signup-email-input" class="long-input" placeholder="이메일 주소를 입력해주세요" required>

        <label for="signup-name-input">이름</label>
        <input type="text" id="signup-name-input" class="long-input" placeholder="이름을 입력해주세요" minlength="2" maxLength="6" required>
        
        <label for="signup-password-input">비밀번호</label>
        <input type="password" id="signup-password-input" class="long-input" placeholder="비밀번호를 입력해주세요" required>

        <label for="password-confirm-input">비밀번호 확인</label>
        <input type="password" id="password-confirm-input" class="long-input" placeholder="비밀번호를 한번 더 입력해주세요" required>

        <button class="signup-confirm-button button">확인</button>
      </form>
    `;
  }

  setEvent() {
    $('.signup-form').addEventListener('submit', this.handleSignupFormSubmit);
  }

  renderProfileManager() {
    $('.login-manager').classList.add('hidden');
    $('.profile-manager').classList.remove('hidden');
    $('.profile-manager-menu').classList.add('hidden');
  }

  handleSignupFormSubmit = (event) => {
    event.preventDefault();

    const emailInputValue = $('#signup-email-input').value;
    const nameInputValue = $('#signup-name-input').value;
    const passwordInputValue = $('#signup-password-input').value;
    const passwordConfirmValue = $('#password-confirm-input').value;

    const newUserInfo = {
      email: emailInputValue,
      name: nameInputValue,
      password: passwordInputValue,
      passwordConfirm: passwordConfirmValue,
    };

    try {
      checkNewUserInfoValidation(newUserInfo);
    } catch (error) {
      showSnackbar(error.message);
      return;
    }
    this.renderProfileManager();
    signup(emailInputValue, nameInputValue, passwordInputValue);
    AuthStateaStoreInstance.dispatchAction(AUTH_ACTION.LOGIN);
  };
}

customElements.define('signup-container', SignupContainer);
