import { joinUser } from '../../business/auth';
import router, { ROUTE_NAME } from '../../lib/router';

class JoinComponent {
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
    this.$joinForm = this.$app.querySelector('#join-form');

    this.$emailJoinInput = this.$app.querySelector('#email-join-input');
    this.$nameJoinInput = this.$app.querySelector('#name-join-input');
    this.$passwordJoinInput = this.$app.querySelector('#password-join-input');
    this.$passwordReenterJoinInput = this.$app.querySelector('#password-reenter-join-input');

    this.$loginButton = this.$app.querySelector('#login-button');
    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
  }

  bindEventHandler() {
    this.$joinForm.addEventListener('submit', this.onSubmitJoinForm);
  }

  showSection() {
    this.$pageTitle.textContent = '회원가입';
    this.$loginButton.classList.add('hide');
    this.$tabNav.classList.add('hide');
    this.$joinForm.classList.remove('hide');
  }

  hideSection() {
    this.$joinForm.classList.add('hide');
  }

  generateTemplate() {
    return `<section>
    <form class="input-form hide" id="join-form">
    <label for="email-join-input">이메일</label>
    <input type="email" class="auth-input" id="email-join-input" placeholder="이메일 주소를 입력해주세요" required></input>

    <label for="name-join-input">이름</label>
    <input type="name" class="auth-input" id="name-join-input" placeholder="이름을 입력해주세요" required></input>

    <label for="password-join-input">비밀번호</label>
    <input type="password" class="auth-input" id="password-join-input" placeholder="비밀번호는 문자와 숫자를 포함하여 8자 이상 이어야 합니다." required></input>

    <label for="password-reenter-join-input">비밀번호 확인</label>
    <input type="password" class="auth-input" id="password-reenter-join-input" placeholder="비밀번호를 다시 입력해주세요" required></input>
    <button class="submit-button" required>확인</button>
    </form>
    </section>
   `;
  }

  onSubmitJoinForm = async e => {
    e.preventDefault();
    const { value: emailValue } = this.$emailJoinInput;
    const { value: nameValue } = this.$nameJoinInput;
    const { value: passwordValue } = this.$passwordJoinInput;
    const { value: passwordReenterValue } = this.$passwordReenterJoinInput;

    await joinUser(emailValue, nameValue, passwordValue, passwordReenterValue);

    router.pushState({ path: ROUTE_NAME.MANAGE }, 'manage');
  };
}
export default JoinComponent;
