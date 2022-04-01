import { $ } from '../utils';

const pageTemplate = `
  <header class="header">
    <div class="icon-button-area">
        <button class="button" data-route="?">🍿 메인으로</button>
    </div>
    <h1 class="title">로그인</h1>
  </header>
  <main class="main">
    <section class="user-information-form-section">
        <form id="login-form" >
            <label>이메일<br>
                <input type="email" placeholder="이메일 주소를 입력해주세요">
            </label>
            <label>비밀번호<br>
                <input type="password" placeholder="비밀번호를 입력해주세요">
            </label>
            <button class="button accent">확인</button>
        </form>
        <label>아직 회원이 아니신가요?<button class="text-button" data-route="?page=signUp">회원가입</button></label>
    </section>
  </main>
`;

export default class LoginPageView {
  loadPage = () => {
    $('#app').innerHTML = pageTemplate;
  };
}
