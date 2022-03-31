class SignInComponent {
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$signinContainer = this.$parent.querySelector('#signin-container');
  }

  generateTemplate() {
    return `<section id="sign-in-container" aria-labelledby="signin-title">
      <h2 id="sign-in-title" hidden>회원가입 화면</h2>
      <a href="#" class="back-button">
        <button type="button" class="gray-button">⬅️</button>
      </a>

      <form id="sign-in-form" class="input-form">
        <div>
          <label for="sign-in-email-input">
            이메일
          </label>
          <input type="email" id="sign-in-email-input" placeholder="이메일 주소를 입력해주세요">
        </div>
        <div>
          <label for="sign-in-name-input">
            이름
          </label>
          <input type="text" id="sign-in-name-input" placeholder="이름을 입력해주세요">
        </div>
        <div>
          <label for="sign-in-password-input">
            비밀번호
          </label>
          <input type="password" id="sign-in-password-input" placeholder="비밀번호를 입력해주세요">
        </div>
        <div>
          <label for="sign-in-password-confirm-input">
            비밀번호 확인
          </label>
          <input type="password" id="sign-in-password-confirm-input" placeholder="비밀번호를 입력해주세요">
        </div>
        <button class="submit-button sign-in-submit-button">확인</button>
      </form>
    </section>`;
  }

  show() {
    this.$signinContainer.classList.remove('hide');
  }

  hide() {
    this.$signinContainer.classList.add('hide');
  }
}
export default SignInComponent;
