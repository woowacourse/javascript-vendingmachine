export const logInTemplate = (isLogin): string =>
  isLogin
    ? `<div class="permission-info">접근 권한이 없습니다.</div>`
    : `
    <h1 class="title">로그인</h1>
    <form id="login-form">
      <label>이메일</label>
      <input id="login-email-input" class="login-input" placeholder="woowacourse@gmail.com" type="email" required/>
      <label>비밀번호</label>
      <input id="login-password-input" class="login-input" placeholder="비밀번호를 입력해주세요" type="password" required/>
      <button>확인</button>
    </form>
    <div class="login-to-signup">아직 회원이 아니신가요? <span id="go-to-signup">회원가입</span></div>
    `;
