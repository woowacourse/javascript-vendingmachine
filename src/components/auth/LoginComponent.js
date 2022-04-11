import { loginUser } from '../../business/logic/auth.js';
import router, { ROUTE_NAME } from '../../lib/router.js';
import { showToast } from '../../lib/toast.js';
import globalStore from '../../business/store/globalStore.ts';
import { GLOBAL_STATE_KEYS } from '../../utils/constants/index.ts';

class LoginComponent {
  $app;
  constructor(handlers) {
    this.$app = document.querySelector('#app');
    this.handlers = handlers;
    this.mount();
    this.initDOM();
    this.bindEventHandler();
  }

  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    /** 상위 컴포넌트가 관리하는 뷰 영역을 참조한다. */
    this.$notAccess = this.$app.querySelector('#not-access-section');

    this.$loginForm = this.$app.querySelector('#login-form');
    this.$emailLoginInput = this.$app.querySelector('#email-login-input');
    this.$passwordLoginInput = this.$app.querySelector('#password-login-input');
    this.$joinButton = this.$app.querySelector('#join-button');
  }

  bindEventHandler() {
    this.$joinButton.addEventListener('click', this.onClickJoinButton);
    this.$loginForm.addEventListener('submit', this.onSubmitLoginForm);
  }

  showSection(isLoggedIn) {
    if (isLoggedIn) {
      this.$loginForm.classList.add('hide');
      this.$notAccess.classList.remove('hide');
      return;
    }

    this.$loginForm.classList.remove('hide');
    this.$notAccess.classList.add('hide');
  }

  hideSection() {
    this.$loginForm.classList.add('hide');
  }

  generateTemplate() {
    return `<section>
    <form class="input-form hide" id="login-form"> 
    <label for="email-login-input">이메일</label>
    <input class="auth-input" id="email-login-input" placeholder="이메일 주소를 입력해주세요" type="email" required></input>
    <label for="password-login-input">비밀번호</label>
    <input class="auth-input" id="password-login-input" placeholder="비밀번호를 입력해주세요" type="password" required></input>
    <button class="submit-button auth-input">확인</button>
    <div>아직 회원이 아니신가요? <a id="join-button">회원가입</a></div>
    </form>
    </section>
    `;
  }

  onSubmitLoginForm = async e => {
    e.preventDefault();
    const { value: email } = this.$emailLoginInput;
    const { value: password } = this.$passwordLoginInput;

    try {
      await loginUser({ email, password });

      router.pushState({ path: ROUTE_NAME.MANAGE }, ROUTE_NAME.MANAGE);

      globalStore.setState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, ROUTE_NAME.MANAGE);

      this.clearForm();

      showToast({ isErrorMessage: false, message: '로그인에 성공하셨습니다.' });
    } catch ({ message }) {
      showToast({ isErrorMessage: true, message });
    }
  };

  onClickJoinButton = () => {
    router.pushState({ path: ROUTE_NAME.JOIN }, ROUTE_NAME.JOIN);

    globalStore.setState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, ROUTE_NAME.JOIN);
  };

  clearForm() {
    this.$emailLoginInput.value = '';
    this.$passwordLoginInput.value = '';
  }
}
export default LoginComponent;
