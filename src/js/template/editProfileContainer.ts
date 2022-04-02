const editProfileContainer = () => {
  return `
        <div id="edit-profile-container" class="account-container">
            <form id="edit-profile-form" class="account-form">
                <div class="login-block">
                    <label>이메일</label>
                    <input type="email" id="edit-profile-email" class="login-input" placeholder="이메일 주소를 입력해주세요" disabled/>
                </div>
                <div class="login-block">
                    <label>이름</label>
                    <input type="text" id="edit-profile-name" class="login-input" placeholder="이름을 입력해주세요" />
                </div>
                <div class="login-block">
                    <label>비밀번호</label>
                    <input type="text" id="edit-profile-password" class="login-input" placeholder="비밀번호를 입력해주세요" />
                </div>
                <div class="login-block">
                    <label>비밀번호 확인</label>
                    <input type="text" id="edit-profile-password-check" class="login-input" placeholder="비밀번호를 입력해주세요" />
                </div>
                <input type="submit" id="login-submit" value="확인"/>
            </form>
        </div>
    `;
};

export default editProfileContainer;
