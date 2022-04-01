const membershipContainer = () => {
  return `
    <header>
        <h1>회원가입</h1>
    </header>
    <div id="membership-container" class="account-container">
        <form id="membership-form" class="account-form">
            <div class="login-block">
                <label>이메일</label>
                <input type="text" class="login-input" placeholder="이메일 주소를 입력해주세요" required/>
            </div>
            <div class="login-block">
                <label>이름</label>
                <input type="text" class="login-input" placeholder="이름을 입력해주세요" required/>
            </div>
            <div class="login-block">
                <label>비밀번호</label>
                <input type="text" class="login-input" placeholder="비밀번호를 입력해주세요" required/>
            </div>
            <div class="login-block">
                <label>비밀번호 확인</label>
                <input type="text" class="login-input" placeholder="비밀번호를 입력해주세요" required/>
            </div>
            <input type="submit" id="login-submit" value="확인"/>
        </form>
    </div>
    `;
};

export default membershipContainer;
