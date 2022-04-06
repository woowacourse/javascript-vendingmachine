const loginTemplate = () => {
  return `
  <h1 class="login-manage__title">로그인</h1>
  <form class="login-manage__form">
    <label class="login-manage__email-label">이메일</label>
    <input class="login-manage__email-input user-input" name="email" type="email" placeholder="woowacourse@gmail.com" />
    <label class="login-manage__password-label">비밀번호</label>
    <input class="login-manage__password-input user-input" name="password" type="password" placeholder="비밀번호를 입력해주세요" />
    <button type="submit" class="login-manage__confirm-button">확인</button>
  </form>
  <div class="login-manange__signup">
    <span>아직 회원이 아니신가요?</span>
    <button type="button" class="login-manage__signup-button">회원가입</button>
  </div>
  `;
};

export { loginTemplate };
