import auth from '../Auth.js';
import { SUCCESS_MESSAGE } from '../constants';
import { renderComponent } from '../utils';
import { renderToastModal } from './ToastNotification';

const signupTemplate = document.createElement('template');

signupTemplate.innerHTML = `
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
        <h1>회원가입</h1>
        <form>
          <label for="email-input">이메일</label>
          <input id="email-input" type="email" placeholder="이메일을 입력해주세요"/>
          <label for="name-input">이름</label>
          <input id="name-input" type="text" placeholder="이름을 입력해주세요" />
          <label for="password-input">비밀번호</label>
          <input id="password-input" type="password" placeholder="비밀번호를 입력해주세요" />
          <label for="password-check-input">비밀번호 확인</label>
          <input id="password-check-input" type="password" placeholder="비밀번호를 입력해주세요" />
          <button id="submit-button" type="submit">확인</button>
        </form>
      </section>
    </div>
  </div>
`;

class Signup extends HTMLElement {
  emailInput: HTMLInputElement;
  nameInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  passwordCheckInput: HTMLInputElement;
  submitButton: HTMLButtonElement;
  auth: any;
  dimmer: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(signupTemplate.content.cloneNode(true));

    this.emailInput = <HTMLInputElement>this.shadowRoot.getElementById('email-input');
    this.nameInput = <HTMLInputElement>this.shadowRoot.getElementById('name-input');
    this.passwordInput = <HTMLInputElement>this.shadowRoot.getElementById('password-input');
    this.passwordCheckInput = <HTMLInputElement>(
      this.shadowRoot.getElementById('password-check-input')
    );
    this.dimmer = <HTMLDivElement>this.shadowRoot.querySelector('.dimmer');
  }

  connectedCallback() {
    this.shadowRoot.querySelector('form').addEventListener('submit', this.signup);
    this.shadowRoot.querySelector('.x-shape').addEventListener('click', this.closeModal);
    this.shadowRoot.addEventListener('click', this.closeModalDimmer);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('form').removeEventListener('submit', this.signup);
    this.shadowRoot.querySelector('.x-shape').removeEventListener('click', this.closeModal);
    this.shadowRoot.removeEventListener('click', this.closeModalDimmer);
  }

  closeModalDimmer = (event: PointerEvent) => {
    if (event.target === this.dimmer) {
      this.closeModal();
    }
  };

  closeModal = () => {
    this.remove();
  };

  signup = async (event: SubmitEvent) => {
    event.preventDefault();
    const payload = {
      email: this.emailInput.value,
      name: this.nameInput.value,
      password: this.passwordInput.value,
      passwordCheck: this.passwordCheckInput.value,
    };
    try {
      const isSignup = await auth.signupAuth(payload);
      if (!isSignup) {
        return;
      }
      this.closeModal();
      renderComponent('log-in');
      renderToastModal('success', SUCCESS_MESSAGE.SIGNUP_COMPLETE);
    } catch (error) {
      renderToastModal('error', error.message);
    }
  };
}

customElements.define('sign-up', Signup);
