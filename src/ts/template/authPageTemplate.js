export const loginUserPageTemplate = `
  <h1>로그인</h1>
  <form class="input-form user-info-form">
    <label>이메일</label>
    <input name="email" type="email" placeholder="이메일 주소를 입력해주세요" autofocus/>
    <label>비밀번호</label>
    <input name="password" type="password" placeholder="비밀번호를 입력해주세요"/>
    <button class="input-form-button">확인</button>
  </form>
  <p class="register-link-text">아직 회원이 아니신가요? <a href="#register">회원가입</a>
  <div class="snackbar"></div>
`;

export const registerUserPageTemplate = `
  <h1>회원가입</h1>
  <form class="input-form user-info-form" >
    <label>이메일</label>
    <input name="email" type="email" placeholder="이메일 주소를 입력해주세요" autofocus/>
    <label>이름</label>
    <input name="name" type="text" minlength="2" maxlength="6" placeholder="이름을 입력해주세요"/>
    <label>비밀번호</label>
    <input name="password" type="password" placeholder="비밀번호를 입력해주세요"/>
    <label>비밀번호 확인</label>
    <input name="confirmPassword" type="password" placeholder="비밀번호를 입력해주세요"/>
    <button class="input-form-button">확인</button>
  </form>
  <div class="snackbar"></div>
`;
