import { $, getInnerInputValues } from '../utils';
import { login } from '../utils/auth';

const pageTemplate = `
  <section class="user-information-form-section">
      <form id="login-form" >
          <label>이메일<br>
              <input type="email" name="email" placeholder="이메일 주소를 입력해주세요">
          </label>
          <label>비밀번호<br>
              <input type="password" name="password" placeholder="비밀번호를 입력해주세요">
          </label>
          <button class="button accent">확인</button>
      </form>
      <label>아직 회원이 아니신가요?<button class="text-button" data-page="signUp">회원가입</button></label>
  </section>
`;

export default class LoginPageView {
  loadPage = () => {
    $('.main').innerHTML = pageTemplate;
    $('#login-form').addEventListener('submit', this.onSubmitLoginForm);
  };

  onSubmitLoginForm = (event) => {
    event.preventDefault();
    const loginInfo = getInnerInputValues(event.target);
    login(loginInfo);
  };
}
