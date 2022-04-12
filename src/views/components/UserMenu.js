import Component from '../../core/Component';
import './Link';
import { auth } from '../../domains/Auth';
import { PAGES } from '../../configs/constants';
import { jumpTo } from '../../utils/domUtils';

class UserMenu extends Component {
  template() {
    const user = auth.useStore((state) => state.user);

    if (user) {
      return `
        <div class="thumbnail">
          <button id="user-thumbnail" class="thumbnail styled-button">${user.name[0]}</button>
          <ul id="user-menu" class="dropdown-menu">
            <li><a-link id="profile-link" href="${PAGES.PROFILE.PATH}">회원 정보 수정</a-link></li>
            <li><button id="logout-link">로그아웃</button></li>
          </ul>
        </div>
      `;
    }

    return `
      <a-link id="login-link" href="${PAGES.LOGIN.PATH}" class="login-button styled-button">로그인</a-link>
    `;
  }

  setEvent() {
    this.addEvent('click', '#user-thumbnail', () => {
      this.querySelector('#user-menu').classList.toggle('show');
    });

    this.addEvent('click', '#logout-link', () => {
      auth.logout();
      jumpTo(PAGES.LANDING.PATH);
    });
  }
}

customElements.define('user-menu', UserMenu);
