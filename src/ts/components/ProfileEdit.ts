import auth from '../Auth.js';
import { SUCCESS_MESSAGE } from '../constants';
import { renderToastModal } from './ToastNotification';

const profileEditTemplate = document.createElement('template');
profileEditTemplate.innerHTML = `
  <style>
    .modal-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: transparent;
    }

    .hide {
      display: none !important;
    }

    .dimmer {
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--dimmer);
    }

    .modal-inner {
      position: absolute;
      top: 0;
      margin-top: 60px;
      background: var(--white);
      border: 1px solid var(--secondary);
      border-radius: 4px;
      padding: 20px 30px;
    }

    .x-shape {
      float: right;
      cursor: pointer;
    }

    section {
      font-family: 'Roboto', sans-serif;
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    button {
      background: var(--primary);
      border-radius: 4px;
      height: 36px;
      border-style: none;
      color: var(--white);
      margin: 20px 0;
    }

    button:hover {
      background: var(--primary-darken);
      cursor: pointer;
    }

    input {
      padding: 0 8px;
      border: 1px solid var(--secondary);
      box-sizing: border-box;
      border-radius: 4px;
      height: 36px;
      line-height: 36px;
      font-weight: 400;
      font-size: 16px;
      margin: 7px 0;
    }

    input::placeholder {
      color: var(--secondary-darken);
    }

    form {
      display: flex;
      flex-direction: column;
      width: 300px;
    }
  </style>

  <div class="modal-container" >
    <div class="dimmer"></div>
    <div class="modal-inner" role="dialog">
      <div class="x-shape">X</div>
      <section>
        <h1>회원 정보 수정</h1>
        <form>
          <label for="email-edit-input">이메일</label>
          <input id="email-edit-input" type="email" disabled/>
          <label for="name-edit-input">이름</label>
          <input id="name-edit-input" type="text" placeholder="이름을 입력해주세요" />
          <label for="password-edit-input">비밀번호</label>
          <input id="password-edit-input" type="password" placeholder="비밀번호를 입력해주세요" />
          <label for="password-check-edit-input">비밀번호 확인</label>
          <input id="password-check-edit-input" type="password" placeholder="비밀번호를 입력해주세요" />
          <button id="submit-edit-button" type="submit">확인</button>
        </form>
      </section>
    </div>
  </div>
`;

class ProfileEdit extends HTMLElement {
  emailEditInput: HTMLInputElement;
  nameEditInput: HTMLInputElement;
  passwordEditInput: HTMLInputElement;
  passwordCheckEditInput: HTMLInputElement;
  userAuth: any;
  dimmer: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(profileEditTemplate.content.cloneNode(true));
    this.emailEditInput = <HTMLInputElement>this.shadowRoot.getElementById('email-edit-input');
    this.nameEditInput = <HTMLInputElement>this.shadowRoot.getElementById('name-edit-input');
    this.passwordEditInput = <HTMLInputElement>(
      this.shadowRoot.getElementById('password-edit-input')
    );
    this.passwordCheckEditInput = <HTMLInputElement>(
      this.shadowRoot.getElementById('password-check-edit-input')
    );
    this.dimmer = <HTMLDivElement>this.shadowRoot.querySelector('.dimmer');
  }

  async connectedCallback() {
    const { email, name } = await auth.getUserData();
    this.emailEditInput.value = String(email);
    this.nameEditInput.value = String(name);
    this.shadowRoot.querySelector('form').addEventListener('submit', this.edit);

    this.shadowRoot.querySelector('.x-shape').addEventListener('click', this.closeModal);
    this.shadowRoot.addEventListener('click', this.closeModalDimmer);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.x-shape').removeEventListener('click', this.closeModal);
    this.shadowRoot.removeEventListener('click', this.closeModalDimmer);
  }

  edit = async (event: SubmitEvent) => {
    event.preventDefault();
    const payload = {
      name: this.nameEditInput.value,
      password: this.passwordEditInput.value,
      passwordCheck: this.passwordCheckEditInput.value,
    };
    try {
      const isEdited = await auth.editProfileAuth(payload);
      if (!isEdited) {
        return;
      }
      this.closeModal();
      window.dispatchEvent(new CustomEvent('@route-login', {}));
      renderToastModal('success', SUCCESS_MESSAGE.EDIT_COMPLETE);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };

  closeModalDimmer = (event: PointerEvent) => {
    if (event.target === this.dimmer) {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.remove();
  };
}

customElements.define('profile-edit', ProfileEdit);
