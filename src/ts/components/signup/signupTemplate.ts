const signupTemplate = `
  <section id="signup-section">
    <h1 class="member-page-main-text">회원가입</h1>
    <form class="member-info-form" id="signup-form">
      <label class="member-info-form-label">이메일</label>
      <input class="member-info-input " id="email-info-input" placeholder="이메일 주소를 입력해주세요" type="text" />
      <p class="member-info-message member-info-error-text" id="email-info-message"></p>
      <label class="member-info-form-label">이름</label>
      <input class="member-info-input" id="name-info-input" placeholder="이름을 입력해주세요" type="text" minlength="1" />
      <p class="member-info-message member-info-error-text " id="name-info-message"></p>
      <label class="member-info-form-label">비밀번호</label>
      <input class="member-info-input" id="password-info-input" placeholder="비밀번호를 입력해주세요" type="password" autocomplete="off" minlength="8" maxlength="16" />
      <p class="member-info-message member-info-error-text" id="password-info-message"></p>
      <label class="member-info-form-label">비밀번호 확인</label>
      <input class="member-info-input" id="password-confirm-info-input" placeholder="비밀번호를 다시 입력해주세요" type="password" autocomplete="off" minlength="8" maxlength="16" />
      <p class="member-info-message member-info-error-text" id="password-confirm-info-message"></p>
      <button class="member-confirm-button" tpye="submit">확인</button>
    </form>
  </section>
`;

export { signupTemplate };
