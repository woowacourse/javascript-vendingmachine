import CustomElement from '../../abstracts/CustomElement';
import { $ } from '../../utils/dom';
import { logout } from '../../utils/auth';
import AuthStateaStoreInstance from '../../domains/stores/AuthStateStore';
import { AUTH_ACTION } from '../../domains/actions';

class UserManager extends CustomElement {
  template() {
    return `
      <a href="#!login" class="login-manager hidden"><button class="login-button">로그인</button></a>
      <div class="profile-manager hidden">
        <button class="profile-button"></button>
        <ul class="profile-manager-menu hidden">
          <li class="info-modify"><a href="#!info-modify">회원 정보 수정</a></li>
          <li class="logout">로그아웃</li>
        </ul>
      </div>
    `;
  }

  renderLoginManager = () => {
    $('.login-manager').classList.remove('hidden');
    $('.profile-manager').classList.add('hidden');
  };

  handleProfileButtonClick = () => {
    $('.profile-manager-menu').classList.toggle('hidden');
  };

  handleLogoutClick = () => {
    this.renderLoginManager();
    logout();
    AuthStateaStoreInstance.dispatchAction(AUTH_ACTION.LOGOUT);
  };

  setEvent() {
    $('.profile-button').addEventListener('click', this.handleProfileButtonClick);
    $('.logout').addEventListener('click', this.handleLogoutClick);
  }
}

customElements.define('user-manager', UserManager);
