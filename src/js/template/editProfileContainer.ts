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
                <div class="valid-box account-name">
                    <p id="name-length" class="hints hide" >이름은 2~6글자까지 가능합니다.</p>
                </div>
                <div class="login-block">
                    <label>비밀번호</label>
                    <input type="password" id="edit-profile-password" class="login-input" placeholder="비밀번호를 입력해주세요" />
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
                    <input type="password" id="edit-profile-password-check" class="login-input" placeholder="비밀번호를 입력해주세요" />
                </div>
                <div class="valid-box account-pwd-confirm">
                    <p id="pwd-confirm" class="hints hide" >비밀번호를 다시 확인하세요.</p>
                </div>
                <input type="submit" id="login-submit" value="확인"/>
            </form>
        </div>
    `;
};

export default editProfileContainer;
