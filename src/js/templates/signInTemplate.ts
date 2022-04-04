const singInTemplate = `
  <h1 id="signin-header">로그인</h1>
  <form id="signin-submit">
    <label for="email-input">이메일</label>
    <input id="email-input" placeholder="woowacourse@gmail.com" type="email" required />
    <label for="password-input">비밀번호</label>
    <input id="password-input" placeholder="비밀번호를 입력해주세요" type="password" required />
    <button id="sigin-submit-button">확인</button>
  </form>
  <div id="offer-signup-container">
    <p>아직 회원이 아니신가요?</p>
    <button id="offer-signup-button">회원가입<button>
  <div>
`;

export default singInTemplate;
