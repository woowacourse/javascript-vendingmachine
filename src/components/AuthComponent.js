import { joinUser, loginUser } from '../business/auth';
import { fetcher } from '../lib/fetcher';
import { AUTH_ROUTE_NAME } from '../utils/constants';

class AuthComponent {
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
    this.form = {
      $loginForm: this.$app.querySelector('#login-form'),
      $joinForm: this.$app.querySelector('#join-form'),
      $editForm: this.$app.querySelector('#edit-form'),
    };

    this.$emailLoginInput = this.$app.querySelector('#email-login-input');
    this.$passwordLoginInput = this.$app.querySelector('#password-login-input');

    this.$emailJoinInput = this.$app.querySelector('#email-join-input');
    this.$nameJoinInput = this.$app.querySelector('#name-join-input');
    this.$passwordJoinInput = this.$app.querySelector('#password-join-input');
    this.$passwordReenterJoinInput = this.$app.querySelector('#password-reenter-join-input');

    this.$loginButton = this.$app.querySelector('#login-button');
    this.$joinButton = this.$app.querySelector('#join-button');

    this.$pageTitle = this.$app.querySelector('#page-title');
    this.$tabNav = this.$app.querySelector('#tab-nav');
  }

  bindEventHandler() {
    const { onClickLoginOrEditButton, onClickJoinButton } = this.handlers;
    this.$loginButton.addEventListener('click', onClickLoginOrEditButton);
    this.$joinButton.addEventListener('click', onClickJoinButton);

    this.form.$loginForm.addEventListener('submit', this.onSubmitLoginForm);
    this.form.$joinForm.addEventListener('submit', this.onSubmitJoinForm);
    this.form.$editForm.addEventListener('submit', this.onSubmitEditForm);
  }

  showSection(name) {
    this.$loginButton.classList.add('hide');
    this.$tabNav.classList.add('hide');

    if (name === AUTH_ROUTE_NAME.LOGIN) {
      this.$pageTitle.textContent = '로그인';
      this.form.$loginForm.classList.remove('hide');
      this.form.$joinForm.classList.add('hide');
      this.form.$editForm.classList.add('hide');
    }
    if (name === AUTH_ROUTE_NAME.JOIN) {
      this.$pageTitle.textContent = '회원가입';
      this.form.$joinForm.classList.remove('hide');
      this.form.$loginForm.classList.add('hide');
      this.form.$editForm.classList.add('hide');
    }
    if (name === AUTH_ROUTE_NAME.EDIT) {
      this.$pageTitle.textContent = '정보수정';
      this.form.$editForm.classList.remove('hide');
      this.form.$loginForm.classList.add('hide');
      this.form.$joinForm.classList.add('hide');
    }
  }

  hide() {
    Object.values(this.form).forEach(formElement => formElement.classList.add('hide'));
  }

  /** sementic 한 input으로 */
  generateTemplate() {
    return `${this.#generateLoginTemplate()}${this.#generateJoinTemplate()}${this.#generateEditTemplate()}`;
  }

  #generateLoginTemplate() {
    return `<section>
    <form class="input-form hide" id="login-form"> 
    <labe id="email-login-input">이메일</label>
    <input class="auth-input" id="email-login-input" placeholder="이메일 주소를 입력해주세요" type="email"></input>
    <label id="password-login-input">비밀번호</label>
    <input class="auth-input" id="password-login-input" placeholder="비밀번호를 입력해주세요" type="password"></input>
    <button class="submit-button auth-input">확인</button>
    <div>아직 회원이 아니신가요? <a id="join-button">회원가입</a></div>
    </form>
    </section>
    `;
  }

  #generateJoinTemplate() {
    return `<section>
    <form class="input-form hide" id="join-form">
    <label id="email-join-input">이메일</label>
    <input type="email" class="auth-input" id="email-join-input" placeholder="이메일 주소를 입력해주세요" required></input>
    <label id="name-join-input">이름</label>
    <input type="name" class="auth-input" id="name-join-input" placeholder="이름을 입력해주세요" required></input>
    <label id="name-join-input">비밀번호</label>
    <input type="password" class="auth-input" id="password-join-input" placeholder="비밀번호를 입력해주세요" required></input>
    <label id="name-join-input">비밀번호 확인</label>
    <input type="password" class="auth-input" id="password-reenter-join-input" placeholder="비밀번호를 다시 입력해주세요" required></input>
    <button class="submit-button" required>확인</button>
    </form>
    </section>
   `;
  }

  #generateEditTemplate() {
    return ` <section>
    <form class="input-form hide" id="edit-form"> 
    <label id="email-join-input">이메일</label>
    <input type="email" class="auth-input" id="email-join-input" placeholder="이메일 주소를 입력해주세요" required></input>
    <label id="name-join-input">이름</label>
    <input type="name" class="auth-input" id="name-join-input" placeholder="이름을 입력해주세요" required></input>
    <label id="name-join-input">비밀번호</label>
    <input type="password" class="auth-input" id="password-join-input" placeholder="비밀번호를 입력해주세요" required></input>
    <label id="name-join-input">비밀번호 확인</label>
    <input type="password" class="auth-input" id="password-reenter-join-input" placeholder="비밀번호를 다시 입력해주세요" required></input>
    <button class="submit-button" required>확인</button>
    </form>
    </section>`;
  }

  onSubmitLoginForm = async e => {
    e.preventDefault();
    const { value: emailValue } = this.$emailLoginInput;
    const { value: passwordValue } = this.$passwordLoginInput;

    await loginUser(emailValue, passwordValue);
  };

  onSubmitJoinForm = async e => {
    e.preventDefault();
    const { value: emailValue } = this.$emailJoinInput;
    const { value: nameValue } = this.$nameJoinInput;
    const { value: passwordValue } = this.$passwordJoinInput;
    const { value: passwordReenterValue } = this.$passwordReenterJoinInput;

    await joinUser(emailValue, nameValue, passwordValue, passwordReenterValue);
  };
  onSubmitEditForm = e => {
    e.preventDefault();
  };
}
export default AuthComponent;
