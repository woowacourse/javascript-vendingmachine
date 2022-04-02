interface SignupViewInterface {
  render();
}

export class SignupView implements SignupViewInterface {
  #target: HTMLDivElement;

  constructor(target) {
    this.#target = target;
  }

  #template() {
    return `
      <h1>회원가입</h1>
      <form id="signup-form" class="auth-form">
        <label for="email">이메일</label>
        <input id="email" class="input" type="email" placeholder="wooteco@gmail.com" />
        <label for="name">이름</label>
        <input id="name" class="input" type="text" placeholder="이름을 입력해주세요" />
        <label for="password">비밀번호</label>
        <input id="password" class="input" type="password" placeholder="비밀번호를 입력해주세요" />
        <label for="password-confirm">비밀번호 확인</label>
        <input id="password-confirm" class="input" type="password" placeholder="비밀번호를 입력해주세요" />
        <button class="submit-button button">확인</button>
      </form>
    `;
  }

  render() {
    this.#target.insertAdjacentHTML('beforeend', this.#template());
  }
}
