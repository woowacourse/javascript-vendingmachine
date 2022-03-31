class LoginComponent {
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$loginContainer = this.$parent.querySelector('#login-container');
  }

  generateTemplate() {
    return `<section id="login-container" aria-labelledby="login-title">
      <h1 id="login-header">로그인</h2>
        <form id="login-form">
          <div>
            <label for="login-email-input">
              이메일
            </label>
            <input type="email" id="login-email-input" placeholder="woowacourse@gmail.com">
          </div>
          <div>
            <label for="login-password-input">
              비밀번호
            </label>
            <input type="password" id="login-password-input" placeholder="비밀번호를 입력해주세요">
          </div>
          <button class="submit-button">확인</button>
        </form>
        <div>
          아직 회원이 아니신가요? <a href="#signup" id="signup-href">회원가입</a>
        </div>
    </section>`;
  }

  show() {
    this.$loginContainer.classList.remove('hide');
  }

  hide() {
    this.$loginContainer.classList.add('hide');
  }
}

export default LoginComponent;
