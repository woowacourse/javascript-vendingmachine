import Component from '../../core/Component';
import { setData, getData } from '../../utils/storageUtil';
import { loginUser } from '../../auth/login';
import { editUser, deleteUser } from '../../auth/edit';
import { isPasswordDifferent } from '../../auth/validate';
import { showSnackBar } from '../../utils/domUtil';
import { ERROR_MESSAGE, NAME, PASSWORD } from '../../constant/constant';

class UserEditPage extends Component {
  setup() {
    const { email, name } = getData('user') ? getData('user').user : '';
    this.state = { userId: this.props.userid, email, name };
  }

  template() {
    const { isloggedin } = this.props;
    const login = JSON.parse(isloggedin);

    if (!login) {
      return `<p>로그인 후 회원 정보 수정을 해주세요</p>`;
    }

    return `
      <header>
        <h1 class="title">회원정보 수정</h1>
      </header>
      <section>
        <h2 hidden>회원 정보 수정 폼</h2>
        <form id="user-edit-form" class="user-edit-form">
          <label for="email">이메일</label>
          <input type="email" class="edit-input styled-input" name="email" value=${this.state.email} required disabled>
          <label for="user-name">이름</label>
          <input type="text" class="edit-input styled-input" placeholder="이름을 입력해주세요" name="userName" minlength=${NAME.MIN_LENGTH} maxlength=${NAME.MAX_LENGTH} value=${this.state.name} required>
          <label for="password">비밀번호</label>
          <input type="password" class="edit-input styled-input" placeholder="비밀번호를 입력해주세요" name="password" pattern=${PASSWORD.PATTERN} required>
          <label for="password-check">비밀번호 확인</label>
          <input type="password" class="edit-input styled-input" placeholder="비밀번호를 입력해주세요" name="passwordCheck" pattern=${PASSWORD.PATTERN} required>
          <button type="submit" class="edit-button styled-button emphasized">확인</button>
        </form>
        <button id="withdraw-button" class="withdraw">탈퇴하기</button>
      </section>
      <div class="snackbar"></div>
    `;
  }

  setEvent() {
    this.addEvent('submit', '#user-edit-form', async (event) => {
      event.preventDefault();

      const { userName, password, passwordCheck } = event.target.elements;

      if (isPasswordDifferent(password.value, passwordCheck.value)) {
        showSnackBar(ERROR_MESSAGE.CHECK_PASSWORD);

        return;
      }

      const userInfo = {
        email: this.state.email,
        name: userName.value,
        password: password.value,
      };

      await editUser(this.state.userId, userInfo);

      const loginResponse = await loginUser({
        email: this.state.email,
        password: password.value,
      });

      if (!loginResponse.accessToken) {
        showSnackBar(loginResponse);

        return;
      }

      setData('user', loginResponse);

      window.location.href = 'http://localhost:9000/';
    });

    this.addEvent('click', '#withdraw-button', async (event) => {
      event.preventDefault();

      await deleteUser();

      localStorage.removeItem('user');
      window.location.href = 'http://localhost:9000/';
    });
  }
}

customElements.define('user-edit', UserEditPage);
