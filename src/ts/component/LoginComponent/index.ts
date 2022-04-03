import { $, replaceHTML } from '../../utils/dom';

export default class LoginComponenet {
  render() {
    replaceHTML($('#app'), this.#template());
  }

  #template() {
    return `
      <h2 class="title" >로그인</h2>
      <form class="login-form">
        <label for="email-input" class="login-form__email-description input-description">이메일</label>
        <input id="email-input" type="email" class="login-form__email-input" placeholder="woowacourse@gmail.com" name="emailInput" />
        <label for="pw-input" class="login-form__pw-description input-description">비밀번호</label>
        <input id="pw-input" type="password" class="login-form__pw-input" placeholder="비밀번호를 입력해주세요." name="pwInput" />
        <button class="login-form__button submit-button">확인</button>
        <p class="signup-description">아직 회원이 아시신가요? <button class="signup-button">회원가입</button></p>
      </form>
    `;
  }
}
