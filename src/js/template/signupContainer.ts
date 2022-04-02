const signupContainer = () => {
  return `
    <div id="signup-container" class="account-container">
        <form id="signup-form" class="account-form">
            <div class="login-block">
                <label>이메일</label>
                <input type="email" id="signup-email" class="login-input" placeholder="이메일 주소를 입력해주세요" required/>
            </div>
            <div class="login-block">
                <label>이름</label>
                <input type="text" id="signup-name" class="login-input" placeholder="이름을 입력해주세요" required/>
            </div>
            <div class="login-block">
                <label>비밀번호</label>
                <input type="text" id="signup-password" class="login-input" placeholder="비밀번호를 입력해주세요" required/>
            </div>
            <div class="login-block">
                <label>비밀번호 확인</label>
                <input type="text" id="signup-password-check" class="login-input" placeholder="비밀번호를 입력해주세요" required/>
            </div>
            <input type="submit" id="login-submit" value="확인"/>
        </form>
    </div>
    `;
};

export default signupContainer;
