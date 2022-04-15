export const changeUserInfoTemplate = (isLogin, user): string =>
  isLogin
    ? `
    <h1 class="title">회원 정보 수정</h1>
    <form id="change-form">
      <label>이메일</label>
      <input id="change-email-input" required value=${user.email} disabled/>
      <label>이름</label>
      <input id="change-name-input" placeholder="이름을 입력해주세요" required/>
      <label>비밀번호</label>
      <input id="change-password-input" placeholder="비밀번호를 입력해주세요" type="password" required/>
      <label>비밀번호 확인</label>
      <input id="change-password-check-input" placeholder="비밀번호를 입력해주세요" type="password" required/>  
      <button>확인</button>
    </form>`
    : `<div class="permission-info">접근 권한이 없습니다.</div>`;
