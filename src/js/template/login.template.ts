const loginTemplate = {
  input: () => `
    <div>
      <label for="email">이메일</label>
      <input id="email" class="input" placeholder="이메일 주소를 입력해주세요" type="email">
    </div>
    <div>
      <label for="password">비밀번호</label>
      <input id="password" class="input" placeholder="비밀번호를 입력해주세요" type="password">
    </div>
      <button  class="button">로그인</button>
      `,
};

export default loginTemplate;
