import CustomElement from '../../abstracts/CustomElement';

class SignupContainer extends CustomElement {
  template() {
    return `
      <h1>회원 가입</h1>
      <form class="signup-form">
        <label for="email-input">이메일</label>
        <input type="email" id="email-input" class="long-input" placeholder="이메일 주소를 입력해주세요">

        <label for="name-input">이름</label>
        <input type="text" id="name-input" class="long-input" placeholder="이름을 입력해주세요">
        
        <label class="password-input" for="password-input">비밀번호</label>
        <input type="text" id="password-input" class="long-input" placeholder="비밀번호를 입력해주세요">

        <label class="password-confirm-input" for="password-input">비밀번호 확인</label>
        <input type="text" id="password-confirm-input" class="long-input" placeholder="비밀번호를 한번 더 입력해주세요">

        <button class="signup-confirm-button button">확인</button>
      </form>
    `;
  }
}

customElements.define('signup-container', SignupContainer);
