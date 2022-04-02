import { editUser } from '../../business/auth';
import router, { ROUTE_NAME } from '../../lib/router';
import globalStore from '../../stores/globalStore';
import { ACTION_TYPES, GLOBAL_STATE_KEYS } from '../../utils/constants';

class EditComponent {
  $app;
  constructor(handlers) {
    this.$app = document.querySelector('#app');
    this.handlers = handlers;
    this.mount();
    this.initDOM();
    this.bindEventHandler();
    this.subscribeStore();
    this.render(globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this));
  }

  mount() {
    this.$app.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$editForm = this.$app.querySelector('#edit-form');
    this.$loginButton = this.$app.querySelector('#login-button');
    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
    this.$notAccess = this.$app.querySelector('#not-access-section');

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
  }

  wakeUp() {
    const authInformation = globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this);
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
    this.$loginButton.classList.add('hide');
    this.$tabNav.classList.add('hide');
    this.$pageTitle.textContent = '정보수정';

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
    const { loggedUser } = globalStore.getState(GLOBAL_STATE_KEYS.AUTH_INFORMATION, this);

    const { value: emailValue } = this.$emailEditInput;
    const { value: nameValue } = this.$nameEditInput;
    const { value: passwordValue } = this.$passwordEditInput;
    const { value: passwordReenterValue } = this.$passwordReenterEditInput;

    const flag = await editUser(
      loggedUser,
      emailValue,
      nameValue,
      passwordValue,
      passwordReenterValue,
    );

    if (flag) {
      alert('수정에 성공하셨습니다.');

      router.pushState({ path: ROUTE_NAME.LOGIN }, ROUTE_NAME.LOGIN);

      globalStore.mutateState({
        actionType: ACTION_TYPES.CHANGE_ROUTE,
        payload: {
          currentRouteName: ROUTE_NAME.LOGIN,
        },
        stateKey: GLOBAL_STATE_KEYS.CURRENT_ROUTE_NAME,
      });

      this.clearForm();
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
