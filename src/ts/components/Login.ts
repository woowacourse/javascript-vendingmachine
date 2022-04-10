import auth from '../Auth.js';
import { ERROR_MESSAGE, PATH_ID, SUCCESS_MESSAGE } from '../constants';
import { renderToastModal } from './ToastNotification';

const loginTemplate = document.createElement('template');

loginTemplate.innerHTML = `
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

    #signup-span {
      cursor: pointer;
      color: blue;
      text-decoration: underline
    }

  </style>

  <div class="modal-container" >
    <div class="dimmer"></div>
    <div class="modal-inner" role="dialog">
      <div class="x-shape">X</div>
      <section>
        <h1>로그인</h1>
        <form>
          <label>이메일</label>
          <input id="email-input" type="email" placeholder="woowacourse@gmail.com" />
          <label>비밀번호</label>
          <input id="password-input" type="password" placeholder="비밀번호를 입력해주세요" />
          <button type="submit">확인</button>
        </form>
        <span>아직 회원이 아닌가요? <span id="signup-span">회원가입</span></span>
      </section>
    </div>
  </div>
`;

class Login extends HTMLElement {
  emailInput: HTMLInputElement;
  passwordInput: HTMLInputElement;
  dimmer: HTMLDivElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true));

    this.emailInput = <HTMLInputElement>this.shadowRoot.getElementById('email-input');
    this.passwordInput = <HTMLInputElement>this.shadowRoot.getElementById('password-input');
    this.dimmer = <HTMLDivElement>this.shadowRoot.querySelector('.dimmer');
  }

  connectedCallback() {
    this.shadowRoot.querySelector('form').addEventListener('submit', this.login);
    this.shadowRoot.querySelector('.x-shape').addEventListener('click', this.closeModal);
    this.shadowRoot.addEventListener('click', this.closeModalDimmer);
    this.shadowRoot.querySelector('#signup-span').addEventListener('click', this.emitRenderSignup);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('form').removeEventListener('submit', this.login);
    this.shadowRoot.querySelector('.x-shape').removeEventListener('click', this.closeModal);
    this.shadowRoot.removeEventListener('click', this.closeModalDimmer);
  }

  closeModalDimmer = (event: PointerEvent) => {
    if (event.target === this.dimmer) {
      this.closeModal();
      window.dispatchEvent(new CustomEvent('@route-logout', {}));
    }
  };

  closeModal = () => {
    this.remove();
  };

  login = async (event: SubmitEvent) => {
    event.preventDefault();
    const payload = {
      email: this.emailInput.value,
      password: this.passwordInput.value,
    };
    try {
      const isLogin = await auth.loginAuth(payload);
      if (!isLogin) {
        return;
      }
      this.emitRouteLogin();
      renderToastModal('success', SUCCESS_MESSAGE.LOGIN_COMPLETE);
    } catch (error) {
      renderToastModal('error', ERROR_MESSAGE.LOGIN_FAILED);
    }
  };

  emitRouteLogin = () => {
    this.closeModal();
    const event = new CustomEvent('@route-login', {});
    window.dispatchEvent(event);
  };

  emitRenderSignup = () => {
    this.closeModal();
    const event = new CustomEvent('@render-signup', {});
    window.dispatchEvent(event);
    const url = PATH_ID.SIGNUP;
    history.pushState({ url }, null, url);
  };
}

customElements.define('log-in', Login);
