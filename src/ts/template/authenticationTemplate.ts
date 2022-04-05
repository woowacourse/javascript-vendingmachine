export const generateLoginTemplate = (): string => `
  <div>
    <form id="login-form" class="authentication-form">
      <label class="authentication-label" for="login-email">이메일</label>
      <input id="login-email" class="authentication-input" type="email" placeholder="woowacourse@gmail.com"/>
      <label class="authentication-label" for="login-password">비밀번호</label>
      <input id="login-password" class="authentication-input" type="password" placeholder="비밀번호를 입력해주세요" minlength="8" maxlength="16"/>
      <button class="input-form-button authentication-button">확인</button>
    </form>
    <p class="not-yet-member">
      아직 회원이 아니신가요? <a href="/" class="not-yet-member-link">회원 가입</a>
    </p>
  </di>
`;

export const test = () => {};
