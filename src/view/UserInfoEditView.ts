import { Auth } from '../domain/Auth';
import { UserInfoProps } from '../utils/interface';

interface UserInfoViewInterface {
  render();
}

export class UserInfoEditView implements UserInfoViewInterface {
  #auth: Auth;
  #target: HTMLDivElement;
  #userInfoEditForm: HTMLFormElement;

  constructor({ target, auth }) {
    this.#target = target;
    this.#auth = auth;
  }

  #template(email: UserInfoProps['email'], name: UserInfoProps['name']) {
    return `
      <h1>회원 정보 수정</h1>
      <form id="user-info-edit-form" class="auth-form">
        <label for="email">이메일</label>
        <input id="email" class="input" type="email" value=${email} disabled />
        <label for="name">이름</label>
        <input id="name" class="input" name="name" type="text" value=${name} placeholder="이름을 입력해주세요" />
        <label for="password">비밀번호</label>
        <input id="password" class="input" type="password" name="password" placeholder="비밀번호를 입력해주세요" />
        <label for="password-confirmation">비밀번호 확인</label>
        <input id="password-confirmation" class="input" type="password" name="password-confirmation" placeholder="비밀번호를 입력해주세요" />
        <button class="submit-button button">확인</button>
      </form>
    `;
  }

  render() {
    const { email, name } = JSON.parse(localStorage.getItem('user'));
    this.#target.insertAdjacentHTML('beforeend', this.#template(email, name));
    this.#selectDOM();
    this.#bindEvent();
  }

  #selectDOM() {
    this.#userInfoEditForm = document.querySelector('#user-info-edit-form');
  }

  #bindEvent() {
    this.#userInfoEditForm.addEventListener('submit', this.#handleEditUserInfo);
  }

  #handleEditUserInfo = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const passwordConfirmation = e.target['password-confirmation'].value;

    const editedUserInfo = {
      email,
      name,
      password,
    };

    try {
      if (
        this.#auth.isValidatedName(name) &&
        this.#auth.isValidatedPassword(password, passwordConfirmation)
      ) {
        await this.#auth.edit(editedUserInfo);
        this.#auth.logout();

        this.#target.dispatchEvent(new CustomEvent('editUserInfoCompleted'));
      }
    } catch (err) {
      alert(err.message);
    }
  };
}
