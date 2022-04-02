import { $, getInnerInputValues } from '../utils';

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
              <input type="password" name="password" placeholder="비밀번호를 입력해주세요">
          </label>
          <label>비밀번호 확인<br>
              <input type="password" name="passwordConfirm" placeholder="비밀번호를 입력해주세요">
          </label>
          <button class="button accent">확인</button>
      </form>
  </section>
`;

export default class SignUpPageView {
  loadPage = () => {
    $('.main').innerHTML = pageTemplate;
    $('#signup-form').addEventListener('submit', this.onSubmitSignUpForm);
  };

  onSubmitSignUpForm = (event) => {
    event.preventDefault();
    console.log(getInnerInputValues(event.target));
  };
}
