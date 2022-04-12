import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils/dom';
import { checkNewUserInfoValidation } from '../../validators';
import { modifyUserInfo } from '../../utils/auth';
import showSnackbar from '../../utils/showSnackbar';

class InfoModifyContainer extends CustomElement {
  template() {
    return `
      <h1>회원 정보 수정</h1>
        <form class="info-form">
          <label for="info-email-input">이메일</label>
          <input type="email" id="info-email-input" class="long-input" placeholder="이메일 주소를 입력해주세요" disabled>

          <label for="info-name-input">이름</label>
          <input type="text" id="info-name-input" class="long-input" placeholder="이름을 입력해주세요" minlength="2" maxLength="6" required>
          
          <label for="info-password-input">비밀번호</label>
          <input type="password" id="info-password-input" class="long-input" placeholder="비밀번호를 입력해주세요" required>

          <label for="password-confirm-input">비밀번호 확인</label>
          <input type="password" id="info-password-confirm-input" class="long-input" placeholder="비밀번호를 한번 더 입력해주세요" required>

          <button class="info-confirm-button button">확인</button>
        </form>
    `;
  }

  renderProfileManager() {
    $('.profile-manager-menu').classList.add('hidden');
  }

  handleInfoFormSubmit = (event) => {
    event.preventDefault();

    const emailInputValue = $('#info-email-input').getAttribute('placeholder');
    const nameInputValue = $('#info-name-input').value;
    const passwordInputValue = $('#info-password-input').value;
    const passwordConfirmValue = $('#info-password-confirm-input').value;

    const newUserInfo = {
      email: emailInputValue,
      name: nameInputValue,
      password: passwordInputValue,
      passwordConfirm: passwordConfirmValue,
    };

    try {
      checkNewUserInfoValidation(newUserInfo);
    } catch (error) {
      showSnackbar(error.message);
      return;
    }
    this.renderProfileManager();
    modifyUserInfo(emailInputValue, nameInputValue, passwordInputValue);
  };

  setEvent() {
    $('.info-form').addEventListener('submit', this.handleInfoFormSubmit);
  }
}

customElements.define('info-modify-container', InfoModifyContainer);
