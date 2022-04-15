export const signUpTemplate = (isLogin): string =>
  isLogin
    ? `<div class="permission-info">이미 로그인 되어있습니다.</div>`
    : `
    <h1 class="title">회원가입</h1>
    <form id="signup-form">
      <label>이메일</label>
      <input id="signup-email-input" placeholder="이메일 주소를 입력해주세요" type="email" required/>
      <label>이름</label>
      <input id="signup-name-input" placeholder="이름을 입력해주세요" required minlength="2" maxlength="6"/>
      <label>비밀번호</label>
      <input id="signup-password-input" placeholder="비밀번호를 입력해주세요" type="password" required/>
      <label>비밀번호 확인</label>
      <input id="signup-password-check-input" placeholder="비밀번호를 입력해주세요" type="password" required/>  
      <button>확인</button>
    </form>`;
