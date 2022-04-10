const loginPageTemplate = /* html */ `
  <h2>로그인</h2>
  <form class="auth-form">
    <label for="email">이메일</label>
    <input
      type="email"
      name="email"
      id="email-input"
      placeholder="이메일을 입력해주세요."
      required
    />
    <label for="password">비밀번호</label>
    <input
      type="password"
      name="password"
      id="password-input"
      placeholder="비밀번호를 입력해주세요."
      required
    />
    <button type="submit" class="submit-button">로그인</button>
    <p>아직 회원이 아니신가요? <a href="#/register" id="register-page-link">회원가입</a></p>
  </form>
`;

export default loginPageTemplate;
