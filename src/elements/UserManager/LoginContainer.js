import CustomElement from '../../abstracts/CustomElement';

class LoginContainer extends CustomElement {
  template() {
    return `
      <h1>로그인</h1>
      <form class="login-form">
        <label for="email-input">이메일</label>
        <input type="email" id="email-input" class="long-input" placeholder="woowacourse@gmail.com">
        <label class="password-input" for="password-input">비밀번호</label>
        <input type="text" id="password-input" class="long-input" placeholder="비밀번호를 입력해주세요">
        <button class="login-confirm-button button">확인</button>
      </form>
      <div class="signup-suggest-container">
        <span class="signup-text">아직 회원이 아니신가요?</span>
        <a href="#!signup" class="signup">회원가입</a>    
      </div>  
    `;
  }
}

customElements.define('login-container', LoginContainer);
