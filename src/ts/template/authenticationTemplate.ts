export const generateLoginTemplate = (): string => `
  <div>
    <form id="login-form" class="authentication-form">
      <label class="authentication-label" for="login-email">이메일</label>
      <input id="login-email" class="authentication-input" type="email" placeholder="woowacourse@gmail.com"/>
      <label class="authentication-label" for="login-password">비밀번호</label>
      <input id="login-password" class="authentication-input" type="password" placeholder="비밀번호를 입력해주세요." minlength="8" maxlength="16"/>
      <button class="input-form-button authentication-button">확인</button>
    </form>
    <p class="not-yet-member">
      아직 회원이 아니신가요? <a href="#register" class="not-yet-member-link">회원 가입</a>
    </p>
  </div>
`;

export const generateUserInfoTemplate = (userEmail?: string, isUserInfoEdit = false): string => `
  <form id="user-info-form" class="authentication-form">
    <label class="authentication-label" for="user-info-email">이메일</label>
    <input id="user-info-email" class="authentication-input" type="email" placeholder="이메일 주소를 입력해주세요." value="${
      isUserInfoEdit ? userEmail : ''
    }" ${isUserInfoEdit ? 'disabled' : ''}/>
    <label class="authentication-label" for="user-info-name">이름</label>
    <input id="user-info-name" class="authentication-input" type="text" placeholder="이름을 입력해주세요." minlength="2" maxlength="6"/>
    <label class="authentication-label" for="user-info-password">비밀번호</label>
    <input id="user-info-password" class="authentication-input" type="password" placeholder="비밀번호를 입력해주세요." minlength="8" maxlength="16"/>
    <label class="authentication-label" for="user-info-verification-password">비밀번호 확인</label>
    <input id="user-info-verification-password" class="authentication-input" type="password" placeholder="비밀번호를 입력해주세요." minlength="8" maxlength="16"/>
    <button class="input-form-button authentication-button">확인</button>
  </form>
`;
