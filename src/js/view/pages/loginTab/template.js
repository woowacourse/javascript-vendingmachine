const loginTemplate = `<main>
<h1 class="user-title">로그인</h1>
<form id="login-form" class="user-form">
  <label>이메일</label>
  <input type="email" placeholder="woowacousre@gmail.com" class="user-form--input" id="login-email" />
  <label>패스워드</label>
  <input type="password" placeholder="비밀번호를 입력해주세요." class="user-form--input" id="login-password"/>
  <button type="submit" class="user-form--button">확인</button>
  <label>아직 회원이 아니신가요? <a href="#/signup" id="signup--anchor">회원가입</a></label>
</form>
</main>`;

export default loginTemplate;
