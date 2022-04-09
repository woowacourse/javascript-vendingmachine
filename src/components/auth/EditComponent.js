import { editUser } from '../../business/logic/auth.js';
import router, { ROUTE_NAME } from '../../lib/router.js';
import { showToast } from '../../lib/toast.js';
import { GLOBAL_STATE_KEYS } from '../../utils/constants/index.ts';
import globalStore from '../../business/store/globalStore.ts';

class EditComponent {
  $app;
  constructor(handlers) {
    this.$app = document.querySelector('#app');
    this.handlers = handlers;
    this.mount();
    this.initDOM();
    this.bindEventHandler();
    this.subscribeStore();
  }

  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    /** 상위 컴포넌트가 관리하는 뷰 영역을 참조한다. */
    this.$notAccess = this.$app.querySelector('#not-access-section');

    this.$editForm = this.$app.querySelector('#edit-form');
    this.$emailEditInput = this.$app.querySelector('#email-edit-input');
    this.$nameEditInput = this.$app.querySelector('#name-edit-input');
    this.$passwordEditInput = this.$app.querySelector('#password-edit-input');
    this.$passwordReenterEditInput = this.$app.querySelector('#password-reenter-edit-input');
  }

  bindEventHandler() {
    this.$editForm.addEventListener('submit', this.onSubmitEditForm);
  }

  subscribeStore() {
    globalStore.subscribe(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this);
    this.wakeUp();
  }

  wakeUp() {
    const authInformation = globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION);
    this.render(authInformation);
  }

  render(authInformation) {
    const { loggedUser } = authInformation;

    if (loggedUser) {
      const { name, email } = loggedUser;

      this.$emailEditInput.value = email;
      this.$nameEditInput.value = name;
      this.$passwordEditInput.value = '';
      this.$passwordReenterEditInput.value = '';
    }
  }

  showSection(isLoggedIn) {
    if (isLoggedIn) {
      this.$editForm.classList.remove('hide');
      this.$notAccess.classList.add('hide');
      return;
    }
    this.$editForm.classList.add('hide');
    this.$notAccess.classList.remove('hide');
  }

  hideSection() {
    this.$editForm.classList.add('hide');
  }

  generateTemplate() {
    return ` <section>
  <form class="input-form hide" id="edit-form"> 
  <label for="email-edit-input">이메일</label>
  <input type="email" class="auth-input" id="email-edit-input" placeholder="이메일 주소를 입력해주세요" required></input>

  <label for="name-edit-input">이름</label>
  <input type="name" class="auth-input" id="name-edit-input" placeholder="이름을 입력해주세요" required></input>

  <label for="password-edit-input">비밀번호</label>
  <input type="password" class="auth-input" id="password-edit-input" placeholder="비밀번호는 문자와 숫자를 포함하여 8자 이상 이어야 합니다." required></input>

  <label for="password-reenter-edit-input">비밀번호 확인</label>
  <input type="password" class="auth-input" id="password-reenter-edit-input" placeholder="비밀번호를 다시 입력해주세요" required></input>

  <button class="submit-button" required>확인</button>
  </form>
  </section>`;
  }

  onSubmitEditForm = async e => {
    e.preventDefault();
    const { loggedUser } = globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION);

    const { value: email } = this.$emailEditInput;
    const { value: name } = this.$nameEditInput;
    const { value: password } = this.$passwordEditInput;
    const { value: passwordReenter } = this.$passwordReenterEditInput;
    try {
      await editUser({ loggedUser, email, name, password, passwordReenter });

      router.pushState({ path: ROUTE_NAME.LOGIN }, ROUTE_NAME.LOGIN);

      globalStore.setState(GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME, ROUTE_NAME.LOGIN);

      this.clearForm();

      showToast({ isErrorMessage: false, message: '유저 정보 수정에 성공하였습니다.' });
    } catch ({ message }) {
      showToast({ isErrorMessage: true, message });
    }
  };

  clearForm() {
    this.$emailEditInput.value = '';
    this.$nameEditInput.value = '';
    this.$passwordEditInput.value = '';
    this.$passwordReenterEditInput.value = '';
  }
}
export default EditComponent;
