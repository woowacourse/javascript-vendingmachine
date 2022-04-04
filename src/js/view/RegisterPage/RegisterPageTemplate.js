const registerPageTemplate = /* html */ `
  <h2>회원가입</h2>
  <form class="auth-form">
    <div class="instructions">
      <h3>👨‍🏫 회원가입 시 유의 사항</h3>
      <ul class="instructions-list">
        <li>모든 항목은 필수로 작성해야 합니다.</li>
        <li>이메일은 중복될 수 없습니다.</li>
        <li>이름은 2자-6자 길이여야 합니다.</li>
        <li>비밀번호는 8자 이상 20자 이하의 길이로 영소문자, 숫자, 특수문자를 포함해야 합니다.</li>
      </ul>
    </div>
    <label for="email">이메일</label>
    <input
      type="email"
      name="email"
      id="email-input"
      placeholder="이메일을 입력해주세요."
    />
    <label for="name">이름</label>
    <input
      type="text"
      name="name"
      id="name-input"
      placeholder="이름을 입력해주세요."
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
    <button type="submit" class="submit-button">회원가입</button>
    <p>이미 회원이신가요? <a href="#/login">로그인</a></p>
  </form>
`;

export default registerPageTemplate;
