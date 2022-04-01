import { loginUser } from '../../business/auth';
import router, { ROUTE_NAME } from '../../lib/router';

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
    this.$loginForm = this.$app.querySelector('#login-form');

    this.$emailLoginInput = this.$app.querySelector('#email-login-input');
    this.$passwordLoginInput = this.$app.querySelector('#password-login-input');

    this.$loginButton = this.$app.querySelector('#login-button');
    this.$joinButton = this.$app.querySelector('#join-button');

    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
  }

  bindEventHandler() {
    this.$joinButton.addEventListener('click', this.onClickJoinButton);
    this.$loginForm.addEventListener('submit', this.onSubmitLoginForm);
  }

  showSection() {
    this.$loginButton.classList.add('hide');
    this.$tabNav.classList.add('hide');
    this.$pageTitle.textContent = '로그인';
    this.$loginForm.classList.remove('hide');
  }

  hideSection() {
    this.$loginForm.classList.add('hide');
  }

  generateTemplate() {
    return `<section>
    <form class="input-form hide" id="login-form"> 
    <label for="email-login-input">이메일</label>
    <input class="auth-input" id="email-login-input" placeholder="이메일 주소를 입력해주세요" type="email"></input>
    <label for="password-login-input">비밀번호</label>
    <input class="auth-input" id="password-login-input" placeholder="비밀번호를 입력해주세요" type="password"></input>
    <button class="submit-button auth-input">확인</button>
    <div>아직 회원이 아니신가요? <a id="join-button">회원가입</a></div>
    </form>
    </section>
    `;
  }

  onSubmitLoginForm = async e => {
    e.preventDefault();
    const { value: emailValue } = this.$emailLoginInput;
    const { value: passwordValue } = this.$passwordLoginInput;

    await loginUser(emailValue, passwordValue);
  };

  onClickJoinButton = () => {
    router.pushState({ path: ROUTE_NAME.JOIN }, 'join');
  };
}
export default LoginComponent;
