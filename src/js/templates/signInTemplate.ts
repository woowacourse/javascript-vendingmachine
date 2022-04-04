import { URL } from '../constants/appContants';

const singInTemplate = `
  <h1 class="sign-header">로그인</h1>
  <form id="signin-submit" class="sign-submit">
    <label for="email-input" class="sign-input-label">이메일</label>
    <input id="email-input" class="sign-input" placeholder="woowacourse@gmail.com" type="email" required />

    <label for="password-input" class="sign-input-label">비밀번호</label>
    <input id="password-input" class="sign-input" placeholder="비밀번호를 입력해주세요" type="password" required autocomplete="no" />

    <button class="sign-submit-button">확인</button>
  </form>
  <div id="offer-signup-container">
    <p>아직 회원이 아니신가요?</p>
    <button id="offer-signup-button" data-url=${URL.SING_UP}>회원가입<button>
  <div>
`;

export default singInTemplate;
