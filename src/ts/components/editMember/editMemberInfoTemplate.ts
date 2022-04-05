const editMemberInfoTemplate = (email: string, name: string) => {
  return `<section id="edit-member-info-section">
    <h1 class="edit-member-info-text">회원 정보 수정</h1>
    <form class="member-info-form" id="signup-form">
      <label class="member-info-form-label">이메일</label>
      <input class="member-info-input disabled-input" id="email-info-input" placeholder="${email}" type="text" disabled />
      <p class="member-info-message member-info-error-text" id="email-info-message"></p>
      <label class="member-info-form-label">이름</label>
      <input class="member-info-input" id="name-info-input" placeholder="${name}" type="text" minlength="1" />
      <p class="member-info-message member-info-error-text " id="name-info-message"></p>
      <label class="member-info-form-label">비밀번호</label>
      <input class="member-info-input" id="password-info-input" placeholder="비밀번호를 입력해주세요." type="password" autocomplete="off" minlength="8" maxlength="16" />
      <p class="member-info-message member-info-error-text" id="password-info-message"></p>
      <label class="member-info-form-label">비밀번호 확인</label>
      <input class="member-info-input" id="password-confirm-info-input" placeholder="비밀번호를 다시 입력해주세요" type="password" autocomplete="off" minlength="8" maxlength="16" />
      <p class="member-info-message member-info-error-text" id="password-confirm-info-message"></p>
      <button class="member-confirm-button" tpye="submit">확인</button>
    </form>
  </section>
`}

export { editMemberInfoTemplate };
