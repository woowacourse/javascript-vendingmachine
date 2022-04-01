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
      <h2 id="login-title" hidden>로그인 화면</h2>
      <a href="#" class="back-button">
        <button type="button" class="gray-button">⬅️</button>   
      </a>
      
      <form id="login-form" class="input-form">
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
          <button class="submit-button login-submit-button">확인</button>
        </form>
        <div>
          아직 회원이 아니신가요? <a href="#signin" id="signup-href">회원가입</a>
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
