const signupTemplate = () => {
  return `
    <h1 class="signup-manage__title">회원가입</h1>
    <form class="signup-manage__form">
      <label>이메일</label>
      <input class="signup-manage__email-input user-input" name="email" type="email" placeholder="이메일 주소를 입력해주세요" />
      <label>이름</label>
      <input class="signup-manage__name-input user-input" name="name" type="text" placeholder="이름을 입력해주세요" />
      <label>비밀번호</label>
      <input class="signup-manage__password-input user-input" name="password" type="password" placeholder="비밀번호를 입력해주세요" />
      <label>비밀번호 확인</label>
      <input class="signup-manage__password-check-input user-input" name="password" type="password" placeholder="비밀번호를 입력해주세요" />
      <button type="submit" class="signup-manage__confirm-button">확인</button>
    </form>
    `;
};

export { signupTemplate };
