const loginTemplate = {
  input: () => `
    <div class="secondary-input-container">
      <label for="email">이메일</label>
      <input id="email" class="input" placeholder="이메일 주소를 입력해주세요" type="email">
    </div>
    <div class="secondary-input-container">
      <label for="password">비밀번호</label>
      <input id="password" class="input" placeholder="비밀번호를 입력해주세요" type="password">
    </div>
      <button class="primary-button">확인</button>
      <div>아직 회원이 아니신가요? <a class="signUp-anchor" href="#!signUp">회원가입</a></div>
      `,
};

export default loginTemplate;
