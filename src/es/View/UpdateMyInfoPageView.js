import User from '../data/User';
import { $, getInnerInputValues } from '../utils';
import { updateUserInfo } from '../utils/auth';

const pageTemplate = ({ email, name }) => `
  <section class="user-information-form-section">
      <form id="update-my-info-form" >
          <label>이메일<br>
              <input type="email" name="email" value=${email} disabled>
          </label>
          <label>이름<br>
              <input type="text" name="name" value=${name} placeholder="이름을 입력해주세요">
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

class UpdateMyInfoPageView {
  loadPage = () => {
    $('.main').innerHTML = pageTemplate({
      email: User.email,
      name: User.name,
    });
    $('#update-my-info-form').addEventListener('submit', this.onSubmitUpdateMyInfoForm);
  };

  onSubmitUpdateMyInfoForm = (event) => {
    event.preventDefault();
    const { email, name, password, passwordConfirm } = getInnerInputValues(event.target);
    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    updateUserInfo({ email, name, password });
  };
}

export default new UpdateMyInfoPageView();
