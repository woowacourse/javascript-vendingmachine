import { Auth } from '../domain/Auth';

interface LoginViewInterface {
  render();
}

export class LoginView implements LoginViewInterface {
  #target: HTMLDivElement;
  #loginForm: HTMLFormElement;
  #signupLink: HTMLSpanElement;
  #auth: Auth;

  constructor({ target, auth }) {
    this.#target = target;
    this.#auth = auth;
  }

  #template() {
    return `
      <h1>로그인</h1>
      <form id="login-form" class="auth-form">
        <label for="email">이메일</label>
        <input id="email" class="input" name="email" type="email" placeholder="wooteco@gmail.com" />
        <label for="password">비밀번호</label>
        <input id="password" class="input" name="password" type="password" placeholder="비밀번호를 입력해주세요" />
        <button class="submit-button button">확인</button>
      </form>
      <p>아직 회원이 아니신가요? <a href="signup" class="signup-link">회원가입</a></p>
    `;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
    this.#selectDOM();
    this.#bindEvent();
  }

  #selectDOM() {
    this.#loginForm = document.querySelector('#login-form');
    this.#signupLink = document.querySelector('.signup-link');
  }

  #bindEvent() {
    this.#loginForm.addEventListener('submit', this.#handleLogin);
    this.#signupLink.addEventListener('click', this.#handleRequestSignupPage);
  }

  #handleRequestSignupPage = (e) => {
    e.preventDefault();

    this.#target.dispatchEvent(new CustomEvent('signupPageRequested'));
  };

  #handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    const email = e.target['email'].value;
    const password = e.target['password'].value;

    try {
      const userInfo = await this.#auth.login({ email, password });
      this.#setUserInfo(userInfo);

      this.#target.dispatchEvent(new CustomEvent('loginCompleted'));
    } catch (err) {
      alert(err.message);
    }
  };

  #setUserInfo(userInfo) {
    const { accessToken, user } = userInfo;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));
  }
}
