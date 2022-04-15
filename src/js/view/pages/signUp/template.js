const signUpTemplate = `<main>
<h1 class="user-title">회원가입</h1>
<form id="sign-up-form" class="user-form">
  <label>이메일</label>
  <input type="email" placeholder="이메일 주소를 입력해주세요" class="user-form--input" id="sign-up-email" required />
  <label>이름</label>
  <input type="text" placeholder="이름을 입력해주세요" class="user-form--input" id="sign-up-name" required />
  <label>비밀번호</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="sign-up-password" required />
  <label>비밀번호 확인</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="sign-up-password-confirm" required />
  <button type="submit" class="user-form--button">확인</button>
</form>
</main>`;

export default signUpTemplate;
