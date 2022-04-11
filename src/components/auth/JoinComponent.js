import { joinUser } from '../../business/logic/auth.js';
import router, { ROUTE_NAME } from '../../lib/router.js';
import { showToast } from '../../lib/toast.js';
import globalStore from '../../business/store/globalStore.ts';
import { GLOBAL_STATE_KEYS } from '../../utils/constants/index.ts';

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
    /** 상위 컴포넌트가 관리하는 뷰 영역을 참조한다. */
    this.$notAccess = this.$app.querySelector('#not-access-section');

    this.$joinForm = this.$app.querySelector('#join-form');
    this.$emailJoinInput = this.$app.querySelector('#email-join-input');
    this.$nameJoinInput = this.$app.querySelector('#name-join-input');
    this.$passwordJoinInput = this.$app.querySelector('#password-join-input');
    this.$passwordReenterJoinInput = this.$app.querySelector('#password-reenter-join-input');
  }

  bindEventHandler() {
    this.$joinForm.addEventListener('submit', this.onSubmitJoinForm);
  }

  showSection(isLoggedIn) {
    if (isLoggedIn) {
      this.$joinForm.classList.add('hide');
      this.$notAccess.classList.remove('hide');
      return;
    }

    this.$joinForm.classList.remove('hide');
    this.$notAccess.classList.add('hide');
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
    const { value: email } = this.$emailJoinInput;
    const { value: name } = this.$nameJoinInput;
    const { value: password } = this.$passwordJoinInput;
    const { value: passwordReenter } = this.$passwordReenterJoinInput;

    try {
      await joinUser({ email, name, password, passwordReenter });

      router.pushState({ path: ROUTE_NAME.LOGIN }, ROUTE_NAME.LOGIN);

      globalStore.setState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, ROUTE_NAME.LOGIN);

      this.clearForm();

      showToast({ isErrorMessage: false, message: '회원가입에 성공하셨습니다.' });
    } catch ({ message }) {
      showToast({ isErrorMessage: true, message });
    }
  };

  clearForm() {
    this.$emailJoinInput.value = '';
    this.$nameJoinInput.value = '';
    this.$passwordJoinInput.value = '';
    this.$passwordReenterJoinInput.value = '';
  }
}
export default JoinComponent;
