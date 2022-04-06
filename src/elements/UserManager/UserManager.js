import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils/dom';

class UserManager extends CustomElement {
  template() {
    return `
      <a href="#!login" class="login-manager" hidden><button class="login-button">로그인</button></a>
      <div class="profile-manager" hidden>
        <button class="profile-button">T</button>
        <ul class="profile-manager-menu hidden">
          <li><a href="#!info-modify">회원 정보 수정</li>
          <li>로그아웃</li>
        </ul>
      </div>
    `;
  }

  handleProfileButtonClick = () => {
    $('.profile-manager-menu').classList.toggle('hidden');
  };

  setEvent() {
    $('.profile-button').addEventListener('click', this.handleProfileButtonClick);
  }
}

customElements.define('user-manager', UserManager);
