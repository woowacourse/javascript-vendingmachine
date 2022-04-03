import { $, getInnerInputValues } from '../utils';
import { signUp } from '../utils/auth';
import { validateUserInfo } from '../validator';

const pageTemplate = `
  <section class="user-information-form-section">
      <form id="signup-form" >
          <label>이메일<br>
              <input type="email" name="email" placeholder="이메일 주소를 입력해주세요">
          </label>
          <label>이름<br>
              <input type="text" name="name" placeholder="이름을 입력해주세요">
          </label>
          <label>비밀번호<br>
              <p class="input-guide">대문자 알파벳, 소문자 알파벳, 숫자를 각각 1자 이상 포함하는 전체 8자 이상의 비밀번호를 입력하세요.</p>
              <input type="password" name="password" placeholder="비밀번호를 입력해주세요">
          </label>
          <label>비밀번호 확인<br>
              <input type="password" name="passwordConfirm" placeholder="비밀번호를 입력해주세요">
          </label>
          <button class="button accent">확인</button>
      </form>
  </section>
`;

class SignUpPageView {
  loadPage = () => {
    $('.main').innerHTML = pageTemplate;
    $('#signup-form').addEventListener('submit', this.onSubmitSignUpForm);
  };

  onSubmitSignUpForm = (event) => {
    event.preventDefault();
    const { email, name, password, passwordConfirm } = getInnerInputValues(event.target);
    try {
      validateUserInfo({ email, name, password, passwordConfirm });
    } catch (err) {
      alert(err.message);
      return;
    }
    signUp({ email, name, password });
  };
}

export default new SignUpPageView();
