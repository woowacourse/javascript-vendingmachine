import { createElementByTemplate, selectDom } from '../utils/dom';
import { emitEvent } from '../utils/event';

const template = `<main>
<h1 class="user-title">회원정보 수정</h1>
<form id="update-user-form" class="user-form">
  <label>이메일</label>
  <input type="email" value="woowacourse@gmail.com" class="user-form--input" id="update-user-email" disabled />
  <label>이름</label>
  <input type="text" placeholder="" class="user-form--input" id="update-user-name" required />
  <label>비밀번호</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="update-user-password" required />
  <label>비밀번호 확인</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="update-user-password-confirm" required />
  <button type="submit" class="user-form--button">확인</button>
</form>
</main>`;

export default class MyProfile {
  #updateContainer;
  #updateForm;
  #emailInput;
  #nameInput;
  #passwordInput;
  #passwordConfirmInput;

  constructor() {
    this.#updateContainer = createElementByTemplate('div', template);
    this.#updateContainer.id = 'app';
    this.#updateForm = selectDom('#update-user-form', this.#updateContainer);
    this.#emailInput = selectDom('#update-user-email', this.#updateContainer);
    this.#nameInput = selectDom('#update-user-name', this.#updateContainer);
    this.#passwordInput = selectDom('#update-user-password', this.#updateContainer);
    this.#passwordConfirmInput = selectDom(
      '#update-user-password-confirm',
      this.#updateContainer
    );

    this.#updateForm.addEventListener('submit', this.#handleupdateForm);
  }

  renderUser(email, name) {
    this.#emailInput.value = email;
    this.#nameInput.placeholder = name;
  }

  get element() {
    return this.#updateContainer;
  }

  #handleupdateForm = (e) => {
    e.preventDefault();
    const email = this.#emailInput.value;
    const name = this.#nameInput.value;
    const password = this.#passwordInput.value;
    emitEvent(this.element, 'update-user', { email, name, password });
  };
}
