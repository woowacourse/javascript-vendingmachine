const signupContainer = () => {
  return `
    <div id="signup-container" class="account-container">
        <form id="signup-form" class="account-form">
            <div class="login-block">
                <label>이메일</label>
                <input type="email" id="signup-email" class="login-input" placeholder="이메일 주소를 입력해주세요" required/>
            </div>
            <div class="valid-box account-email-confirm">
                <p id="email-confirm" class="hints hide" >올바르지 않은 이메일 주소입니다.</p>
            </div>
            <div class="login-block">
                <label>이름</label>
                <input type="text" id="signup-name" class="login-input" placeholder="이름을 입력해주세요" required/>
            </div>
            <div class="valid-box account-name">
                <p id="name-length" class="hints hide" >이름은 2~6글자까지 가능합니다.</p>
            </div>
            <div class="login-block">
                <label>비밀번호</label>
                <input type="text" id="signup-password" class="login-input" placeholder="비밀번호를 입력해주세요" required/>
            </div>
            <div class="valid-box account-pwd">
                <p id="pwd-min-length" class="hints hide" >최소한 8글자 이상이여야 합니다.</p>
                <p id="pwd-lowercase" class="hints hide" >소문자를 적어도 하나 이상 포함시켜야 합니다.</p>
                <p id="pwd-uppercase" class="hints hide" >대문자를 적어도 하나 이상 포함시켜야 합니다.</p>
                <p id="pwd-special" class="hints hide" >특수문자(#?!@$%^&*-)를 적어도 하나 이상 포함시켜야 합니다.</p>
                <p id="pwd-digit" class="hints hide" >숫자를 적어도 하나 이상 포함시켜야 합니다.</p>
            </div>
            <div class="login-block">
                <label>비밀번호 확인</label>
                <input type="text" id="signup-password-check" class="login-input" placeholder="비밀번호를 입력해주세요" required/>
            </div>
            <div class="valid-box account-pwd-confirm">
                <p id="pwd-confirm" class="hints hide" >비밀번호를 다시 확인하세요.</p>
            </div>
            <input type="submit" id="login-submit" value="확인"/>
        </form>
    </div>
    `;
};

export default signupContainer;
