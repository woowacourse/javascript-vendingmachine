const userInfoPageTemplate = ({ email, name }) => /* html */ `
  <h2>회원 정보 수정</h2>
  <div class="instructions">
    <h3>👨‍🏫 회원정보 수정 시 유의 사항</h3>
    <ul class="instructions-list">
      <li>이메일은 수정이 불가능합니다.</li>
      <li>정보의 일부를 변경할 수 있습니다.</li>
      <li>비밀번호를 수정하고자 하지 않는다면 비밀번호 입력란과 확인란을 입력하지 마세요.</li>
      <li>이름은 2자-6자 길이여야 합니다.</li>
      <li>비밀번호는 8자 이상 20자 이하의 길이로 영소문자, 숫자, 특수문자를 포함해야 합니다.</li>
    </ul>
  </div>
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
      placeholder="비밀번호를 변경하려면 입력해주세요."
    />
    <label for="password-confirm">비밀번호 확인</label>
    <input
      type="password"
      name="password-confirm"
      id="password-confirm-input"
      placeholder="비밀번호를 변경하려면 입력해주세요."
    />
    <button type="submit" class="submit-button">수정하기</button>
  </form>
`;

export default userInfoPageTemplate;
