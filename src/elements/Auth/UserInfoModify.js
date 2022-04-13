import AuthStore from '../../domains/stores/AuthStore';
import { getUser } from '../../domains/Auth';

import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils';
import { BASE_HASH } from '../../constants';

class UserInfoModify extends CustomElement {
  async connectedCallback() {
    await this.render();
    this.setEvent();
    AuthStore.instance.subscribe(this);
  }

  async render() {
    const user = await getUser();

    this.insertAdjacentHTML('beforeend', this.template(user?.email));
  }

  template(email) {
    return `
      <h1>회원 정보 수정</h1>
      <form class="user-info-modify-form auth-form">
        <fieldset disabled>
          <label for="user-info-modify-email">이메일</label>
          <input type="email" id="user-info-modify-email" placeholder="${email}">
        </fieldset>
        <fieldset>
          <label for="user-info-modify-name">이름</label>
          <input id="user-info-modify-name" placeholder="이름을 입력해주세요" required>
          <label for="user-info-modify-password">비밀번호</label>
          <input type="password" id="user-info-modify-password" placeholder="비밀번호를 입력해주세요" required>
          <label for="user-info-modify-password-confirm">비밀번호 확인</label>
          <input type="password" id="user-info-modify-password-confirm" placeholder="비밀번호를 입력해주세요" required>
          <button class="user-info-modify-confirm-button">확인</button>
        </fieldset>
      </form>
    `;
  }

  setEvent() {
    $('.user-info-modify-form').addEventListener('submit', this.handleUserInfoModifyFormSubmit);
  }

  handleUserInfoModifyFormSubmit = (event) => {
    event.preventDefault();

    window.location.hash = BASE_HASH;
  };

  async rerender() {
    const user = await getUser();

    $('#user-info-modify-email').placeholder = user?.email;
  }
}

customElements.define('user-info-modify', UserInfoModify);

export default UserInfoModify;
