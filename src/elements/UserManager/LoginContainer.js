import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils/dom';
import { login } from '../../utils/auth';
import AuthStateStoreInstance from '../../domains/stores/AuthStateStore';
import { AUTH_ACTION } from '../../domains/actions';

class LoginContainer extends CustomElement {
  template() {
    return `
      <h1>로그인</h1>
      <form class="login-form">
        <label for="email-input">이메일</label>
        <input type="email" id="email-input" class="long-input" placeholder="woowacourse@gmail.com" required>
        <label class="password-input" for="password-input">비밀번호</label>
        <input type="password" id="password-input" class="long-input" placeholder="비밀번호를 입력해주세요" required>
        <button class="login-confirm-button button">확인</button>
      </form>
      <div class="signup-suggest-container">
        <span class="signup-text">아직 회원이 아니신가요?</span>
        <a href="#!signup" class="signup">회원가입</a>    
      </div>  
    `;
  }

  renderProfileManager() {
    $('.login-manager').classList.add('hidden');
    $('.profile-manager').classList.remove('hidden');
    $('.profile-manager-menu').classList.add('hidden');
  }

  handleLoginFormSubmit = (event) => {
    event.preventDefault();

    const emailInputValue = $('#email-input').value;
    const passwordInputValue = $('#password-input').value;

    this.renderProfileManager();
    login(emailInputValue, passwordInputValue);
    AuthStateStoreInstance.dispatchAction(AUTH_ACTION.LOGIN);
  };

  setEvent() {
    $('.login-form').addEventListener('submit', this.handleLoginFormSubmit);
  }
}

customElements.define('login-container', LoginContainer);
