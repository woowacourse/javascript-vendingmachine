const loginContainer = () => {
  return `
    <div id="login-container" class="account-container">
        <form id="login-form" class="account-form">
            <div class="login-block">
                <label>이메일</label>
                <input type="email" id="login-email" class="login-input" placeholder="woowacourse@gmail.com" required/>
            </div>
            <div class="login-block">
                <label>비밀번호</label>
                <input type="text" id="login-password" class="login-input" placeholder="비밀번호를 입력해주세요" required/>
            </div>
            <input type="submit" id="login-submit" value="확인"/>
        </form>
        <p class="login-p">아직 회원이 아니신가요? <a href="#!/signup">회원가입</a></p>
    </div>
    `;
};

export default loginContainer;
