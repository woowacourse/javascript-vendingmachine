import { $ } from '../utils';

const pageTemplate = `
  <header class="header">
  <div class="icon-button-area">
      <button class="button" data-route="?">🍿 메인으로</button>
  </div>
  <h1 class="title">회원가입</h1>
  </header>
  <main class="main">
  <section class="user-information-form-section">
      <form id="signup-form" >
          <label>이메일<br>
              <input type="email" placeholder="이메일 주소를 입력해주세요">
          </label>
          <label>이름<br>
              <input type="text" placeholder="이름을 입력해주세요">
          </label>
          <label>비밀번호<br>
              <input type="password" placeholder="비밀번호를 입력해주세요">
          </label>
          <label>비밀번호 확인<br>
              <input type="password" placeholder="비밀번호를 입력해주세요">
          </label>
          <button class="button accent">확인</button>
      </form>
  </section>
  </main>
`;

export default class SignUpPageView {
  loadPage = () => {
    $('#app').innerHTML = pageTemplate;
  };
}
