import { deleteUserAuth, getUserAuth, getUserFirstName } from '../auth';
import { SUCCESS_MESSAGE } from '../constants';
import { renderToastModal } from './ToastNotification';

const userMenuTemplate = document.createElement('template');

userMenuTemplate.innerHTML = `
  <style>
    #thumbnail {
      font-family: 'Roboto', sans-serif;
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    button {
      background: var(--primary);
      border-radius: 4px;
      height: 36px;
      border-style: none;
      color: var(--white);
      margin: 20px 0;
    }

    button:hover {
      background: var(--primary-darken);
      cursor: pointer;
    }

    input {
      padding: 0 8px;
      border: 1px solid var(--secondary);
      box-sizing: border-box;
      border-radius: 4px;
      height: 36px;
      line-height: 36px;
      font-weight: 400;
      font-size: 16px;
      margin: 7px 0;
    }

    input::placeholder {
      color: var(--secondary-darken);
    }

    form {
      display: flex;
      flex-direction: column;
      width: 300px;
    }

    #login-button {
      position: absolute;
      top: 0;
      right: 10px;
    }

    #menu-wrapper {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }

    #thumbnail {
      border-radius: 100%;
      width: 40px;
      height: 40px;
      background-color: var(--primary);
      font-weight: bold;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      color: #fff;
    }

    #thumbnail:hover {
      background-color: var(--primary-darken);
    }

    .hide {
      display: none;
    }

    #menu {
      background: var(--secondary);
      color: var(--white);
      border-radius: 5px;
      padding: 0;
      width: 120px;
      position: absolute;
      right: 0;
    }

    .menu-item {
      margin: 0;
      padding: 10px;
      text-align: center;
      font-weight: bold;
    }

    .menu-item:hover {
      background-color: var(--secondary-darken);
      border-radius: 5px;
    }

    hr {
      border: 1px solid var(--white);
      margin: 0;
    }
  </style>
  <button id="login-button">로그인</button>
  <div id="menu-wrapper" class="hide">
    <div id="thumbnail">
    </div>
    <div class="hide" id="menu">
      <div class="menu-item" id="profile-edit-button">회원정보 수정</div>
      <hr>
      <div class="menu-item" id="logout-button">로그아웃</div>
    </div>
  </div>
`;

class UserMenu extends HTMLElement {
  loginButton: HTMLButtonElement;
  thumbnail: HTMLDivElement;
  profileEditButton: HTMLButtonElement;
  logoutButton: HTMLButtonElement;
  menuWrapper: HTMLDivElement;
  menu: HTMLDivElement;

  static get observedAttributes() {
    return ['auth'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(userMenuTemplate.content.cloneNode(true));

    this.loginButton = this.shadowRoot.querySelector('#login-button');
    this.thumbnail = this.shadowRoot.querySelector('#thumbnail');
    this.profileEditButton = this.shadowRoot.querySelector('#profile-edit-button');
    this.logoutButton = this.shadowRoot.querySelector('#logout-button');
    this.menuWrapper = this.shadowRoot.querySelector('#menu-wrapper');
    this.menu = this.shadowRoot.querySelector('#menu');
  }

  connectedCallback() {
    this.loginButton.addEventListener('click', this.handleLoginButton);
    this.thumbnail.addEventListener('click', this.toggleMenu);
    this.profileEditButton.addEventListener('click', this.emitRenderProfileEdit);
    this.logoutButton.addEventListener('click', this.logout);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleLoginButton);
    this.thumbnail.removeEventListener('click', this.toggleMenu);
    this.profileEditButton.removeEventListener('click', this.emitRenderProfileEdit);
    this.logoutButton.removeEventListener('click', this.logout);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.checkLoginStatus();
  }

  handleLoginButton = () => {
    const event = new CustomEvent('@render-login', {});
    window.dispatchEvent(event);
  };

  checkLoginStatus = async () => {
    if (!getUserAuth()) {
      this.renderLoginButton();

      return;
    }

    const userFirstName = await getUserFirstName();
    if (!userFirstName) {
      this.renderLoginButton();

      return;
    }
    this.renderUserThumbnail(userFirstName);
  };

  renderLoginButton = () => {
    this.loginButton.classList.remove('hide');
    this.menuWrapper.classList.add('hide');
  };

  renderUserThumbnail = (firstName: string) => {
    this.thumbnail.textContent = firstName;
    this.loginButton.classList.add('hide');
    this.menuWrapper.classList.remove('hide');
    this.menu.classList.add('hide');
  };

  toggleMenu = () => {
    this.menu.classList.toggle('hide');
  };

  emitRenderProfileEdit = () => {
    this.menu.classList.add('hide');
    window.dispatchEvent(new CustomEvent('@render-profile-edit', {}));
  };

  logout = () => {
    deleteUserAuth();
    window.dispatchEvent(new CustomEvent('@route-logout', {}));
    renderToastModal('success', SUCCESS_MESSAGE.LOGOUT_COMPLETE);
  };
}

customElements.define('user-menu', UserMenu);
