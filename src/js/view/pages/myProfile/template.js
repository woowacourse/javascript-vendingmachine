const myProfileTemplate = `<main>
<h1 class="user-title">회원정보 수정</h1>
<form id="update-user-form" class="user-form">
  <label>이메일</label>
  <input type="email" value="woowacourse@gmail.com" class="user-form--input" id="update-user-email" disabled />
  <label>이름</label>
  <input type="text" placeholder="" class="user-form--input" id="update-user-name" required />
  <label>비밀번호</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="update-user-password" required />
  <label>비밀번호 확인</label>
  <input type="password" placeholder="비밀번호를 입력해주세요" class="user-form--input" id="update-user-password-confirm" required />
  <button type="submit" class="user-form--button">확인</button>
</form>
</main>`;

export default myProfileTemplate;
