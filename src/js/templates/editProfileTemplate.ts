export const editProfile = `
  <h1 class="sign-header">회원 정보 수정</h1>
  <form id="edit-submit" class="sign-submit">
    <label for="email-input" class="sign-input-label">이메일</label>
    <input id="email-input" class="sign-input"/>

    <label for="name-input" class="sign-input-label">이름</label>
    <input id="name-input" class="sign-input" required />
    
    <label for="password-input" class="sign-input-label">비밀번호</label>
    <input id="password-input" class="sign-input" placeholder="비밀번호를 입력해주세요" type="password" required autocomplete="no" />

    <label for="password-confirm-input" class="sign-input-label">비밀번호 확인</label>
    <input id="password-confirm-input" class="sign-input" placeholder="비밀번호를 입력해주세요" type="password" required  autocomplete="no" />
    
    <button class="sign-submit-button">확인</button>
  </form>
`;
