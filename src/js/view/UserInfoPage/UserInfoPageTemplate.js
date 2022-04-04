const userInfoPageTemplate = ({ email, name }) => /* html */ `
  <h2>회원 정보 수정</h2>
  <form class="auth-form">
    <label for="email">이메일</label>
    <input
      type="email"
      name="email"
      id="email-input"
      value="${email}"
      disabled
    />
    <label for="name">이름</label>
    <input
      type="text"
      name="name"
      id="name-input"
      value="${name}"
    />
    <label for="password">비밀번호</label>
    <input
      type="password"
      name="password"
      id="password-input"
      placeholder="비밀번호를 입력해주세요."
    />
    <label for="password-confirm">비밀번호 확인</label>
    <input
      type="password"
      name="password-confirm"
      id="password-confirm-input"
      placeholder="비밀번호를 다시 입력해주세요."
    />
    <button type="submit" class="submit-button">수정하기</button>
  </form>
`;

export default userInfoPageTemplate;
