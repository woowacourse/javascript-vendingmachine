const loginTemplate = `
  <section id="login-section">
    <h1 class="member-page-main-text">로그인</h1>
    <form class="member-info-form" id="login-form">
      <label class="member-info-form-label">이메일</label>
      <input class="member-info-input" placeholder="example@gmail.com" type="email" />
      <label class="member-info-form-label">비밀번호</label>
      <input class="member-info-input" placeholder="비밀번호를 입력해주세요" type="password" autocomplete="off" minlength="8" maxlength="16" />
      <button class="member-confirm-button" tpye="submit">확인</button>
    </form>
    <p>아직 회원이 아니신가요? <span class="signup-text">회원가입</span></p>
  </section>
`;

export { loginTemplate };
