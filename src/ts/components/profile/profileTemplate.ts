const profileTemplate = () => {
  return `
      <h1 class="profile-title">회원 정보 수정</h1>
      <form class="profile-form">
        <label>이메일</label>
        <input class="profile-form__email-input user-input" name="email" type="email" placeholder="" disabled />
        <label>이름</label>
        <input class="profile-form__name-input user-input" name="name" type="text" placeholder="이름을 입력해주세요" value="" />
        <label>비밀번호</label>
        <input class="profile-form__password-input user-input" name="password" type="password" placeholder="비밀번호를 입력해주세요" />
        <label>비밀번호 확인</label>
        <input class="profile-form__password-input--check user-input" name="password" type="password" placeholder="비밀번호를 입력해주세요" />
        <button type="submit" class="profile-form__confirm-button">확인</button>
      </form>
      `;
};

export { profileTemplate };
