export const signUpTemplate = `
  <h1 class="sign-header">회원가입</h1>
  <form id="signup-submit" class="sign-submit">
    <label for="email-input" class="sign-input-label">이메일</label>
    <input id="email-input" class="sign-input" placeholder="이메일 주소를 입력해주세요" type="email" required />

    <label for="name-input" class="sign-input-label">이름</label>
    <input id="name-input" class="sign-input" placeholder="이름을 입력해주세요" required />
    
    <label for="password-input" class="sign-input-label">비밀번호</label>
    <input id="password-input" class="sign-input" placeholder="비밀번호를 입력해주세요" type="password" required autocomplete="no" />

    <label for="password-confirm-input" class="sign-input-label">비밀번호 확인</label>
    <input id="password-confirm-input" class="sign-input" placeholder="비밀번호를 입력해주세요" type="password" required  autocomplete="no" />
    
    <button class="sign-submit-button">확인</button>
  </form>
`;
