import AuthStore from '../stores/authStore';
import { userInfoStorage } from '../stores/localStorage';
import { AuthActionTypes } from '../utils/constants';
import { checkEditUserInput } from '../utils/validation';

class EditUserInfoComponent {
  constructor($parent) {
    this.$parent = $parent;
    this.mount();
    this.initDOM();
    this.bindEventListener();
  }

  mount() {
    this.$parent.insertAdjacentHTML('beforeend', this.generateTemplate());
  }

  initDOM() {
    this.$editUserInfoContainer = this.$parent.querySelector('#edit-user-info-container');
    this.$editUserInfoForm = this.$parent.querySelector('#edit-user-info-form');
    this.$editUserEmailInput = this.$parent.querySelector('#edit-email-input');
    this.$editUserNameInput = this.$parent.querySelector('#edit-name-input');
    this.$editUserPasswordInput = this.$parent.querySelector('#edit-password-input');
    this.$editUserPasswordConfirmInput = this.$parent.querySelector('#edit-password-confirm-input');
  }

  generateTemplate() {
    return `<section id="edit-user-info-container" aria-labelledby="edit-user-info-title">
      <h2 id="edit-user-info-title" hidden>회원 정보 수정 화면</h2>
      <a href="#" class="back-button">
        <button type="button" class="gray-button">⬅️</button>
      </a>

      <form id="edit-user-info-form" class="input-form">
        <div>
          <label for="edit-email-input"> 이메일 </label>
          <input type="email" readonly id="edit-email-input" />
        </div>
        <div>
          <label for="edit-name-input">이름</label>
          <input type="text" id="edit-name-input"/>
        </div>
        <div>
          <label for="edit-password-input">비밀번호</label>
          <input type="password" id="edit-password-input" placeholder="비밀번호를 입력해주세요" />
        </div>
        <div>
          <label for="edit-password-confirm-input">비밀번호 확인</label>
          <input
            type="password"
            id="edit-password-confirm-input"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <button class="submit-button" id="edit-submit-button">확인</button>
      </form>
    </section>`;
  }

  show() {
    this.$editUserInfoContainer.classList.remove('hide');
  }
  hide() {
    this.$editUserInfoContainer.classList.add('hide');
  }

  renderUserInfo() {
    const userInfo = userInfoStorage.getUserInfo();
    const { userEmail, userName } = userInfo;

    this.$editUserEmailInput.placeholder = userEmail;
    this.$editUserNameInput.placeholder = userName;
    this.$editUserNameInput.value = userName;
  }

  bindEventListener() {
    this.$editUserInfoForm.addEventListener('submit', this.onSubmitEditUserInfoForm);
  }

  onSubmitEditUserInfoForm = e => {
    e.preventDefault();

    const { value: userNameInput } = this.$editUserNameInput;
    const { value: userPasswordInput } = this.$editUserPasswordInput;
    const { value: userPasswordConfirmInput } = this.$editUserPasswordConfirmInput;

    try {
      if (
        checkEditUserInput({
          nameInput: userNameInput,
          passwordInput: userPasswordInput,
          passwordConfirmInput: userPasswordConfirmInput,
        })
      ) {
        AuthStore.mutateState({
          actionType: AuthActionTypes.EDIT_USER_INFO,
          payload: {
            name: userNameInput,
            password: userPasswordInput,
          },
        });
      }
    } catch ({ message }) {
      alert(message);
    }
  };
}

export default EditUserInfoComponent;
