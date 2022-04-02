interface LoginViewInterface {
  render();
}

export class LoginView implements LoginViewInterface {
  #target: HTMLDivElement;

  constructor(target) {
    this.#target = target;
  }

  #template() {
    return `
      <h1>로그인</h1>
      <form id="login-form" class="auth-form">
        <label for="email">이메일</label>
        <input id="email" class="input" type="email" placeholder="wooteco@gmail.com" />
        <label for="password">비밀번호</label>
        <input id="password" class="input" type="password" placeholder="비밀번호를 입력해주세요" />
        <button class="submit-button button">확인</button>
      </form>
    `;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
  }
}
