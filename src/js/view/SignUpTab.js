import { createElementByTemplate, generateSnackBar, selectDom } from '../utils/dom';
import { emitEvent } from '../utils/event';

const template = `<main>
<h1 class="user-title">회원가입</h1>
<form id="sign-up-form" class="user-form">
  <label>이메일</label>
  <input type="email" placeholder="이메일 주소를 입력해주세요" class="user-form--input" id="sign-up-email" required />
  <label>이름</label>
  <input type="text" placeholder="이름을 입력해주세요" class="user-form--input" id="sign-up-name" required />
  <label>비밀번호</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="sign-up-password" required />
  <label>비밀번호 확인</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="sign-up-password-confirm" required />
  <button type="submit" class="user-form--button">확인</button>
</form>
</main>`;

export default class SignUpTab {
  #signUpContainer;
  #signUpForm;
  #emailInput;
  #nameInput;
  #passwordInput;
  #passwordConfirmInput;

  constructor() {
    this.#signUpContainer = createElementByTemplate('div', template);
    this.#signUpContainer.id = 'app';
    this.#signUpForm = selectDom('#sign-up-form', this.#signUpContainer);
    this.#emailInput = selectDom('#sign-up-email', this.#signUpContainer);
    this.#nameInput = selectDom('#sign-up-name', this.#signUpContainer);
    this.#passwordInput = selectDom('#sign-up-password', this.#signUpContainer);
    this.#passwordConfirmInput = selectDom(
      '#sign-up-password-confirm',
      this.#signUpContainer
    );

    this.#signUpForm.addEventListener('submit', this.#handlesignUpForm);
  }

  get element() {
    return this.#signUpContainer;
  }

  #handlesignUpForm = (e) => {
    e.preventDefault();
    const email = this.#emailInput.value;
    const name = this.#nameInput.value;
    const password = this.#passwordInput.value;
    if (password !== this.#passwordConfirmInput.value) {
      generateSnackBar('비밀번호와 비밀번호 확인이 일치하지않습니다.');
      return;
    }
    emitEvent(this.element, 'sign-up', { email, name, password });
  };
}
