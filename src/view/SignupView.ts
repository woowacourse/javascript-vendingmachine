import { Auth } from '../domain/Auth';

interface SignupViewInterface {
  render();
}

export class SignupView implements SignupViewInterface {
  #target: HTMLDivElement;
  #signupForm: HTMLFormElement;
  #auth: Auth;

  constructor({ target, auth }) {
    this.#target = target;
    this.#auth = auth;
  }

  #template() {
    return `
      <h1>회원가입</h1>
      <form id="signup-form" class="auth-form">
        <label for="email">이메일</label>
        <input id="email" class="input" name="email" type="email" placeholder="wooteco@gmail.com" required />
        <label for="name">이름</label>
        <input id="name" class="input" name="name" type="text" placeholder="이름을 입력해주세요" required />
        <label for="password">비밀번호</label>
        <input id="password" class="input" name="password" type="password" placeholder="비밀번호를 입력해주세요" required />
        <label for="password-confirmation">비밀번호 확인</label>
        <input id="password-confirmation" class="input" name="password-confirmation" type="password" placeholder="비밀번호를 입력해주세요" required />
        <button class="submit-button button">확인</button>
      </form>
    `;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
    this.#selectDOM();
    this.#bindEvent();
  }

  #selectDOM() {
    this.#signupForm = document.querySelector('#signup-form ');
  }

  #bindEvent() {
    this.#signupForm.addEventListener('submit', this.#handleSignup);
  }

  #handleSignup = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target['password-confirmation'].value;

    const signupInfo = {
      email,
      name,
      password,
    };

    const loginInfo = {
      email,
      password,
    };

    try {
      if (
        this.#auth.isValidatedName(name) &&
        this.#auth.isValidatedPassword(password, passwordConfirmation)
      ) {
        await this.#auth.signup(signupInfo);
        const userInfo = await this.#auth.login(loginInfo);
        this.#setUserInfo(userInfo);

        this.#target.dispatchEvent(new CustomEvent('loginCompleted'));
      }
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
