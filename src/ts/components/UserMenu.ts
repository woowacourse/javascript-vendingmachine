import auth from '../Auth.js';
import { PATH_ID, SUCCESS_MESSAGE } from '../constants';
import { renderToastModal } from './ToastNotification';

const userMenuTemplate = document.createElement('template');

userMenuTemplate.innerHTML = `
  <style>
    button {
      background: var(--primary);
      border-radius: 4px;
      height: 36px;
      border-style: none;
      color: var(--white);
      width: 56px;
      margin-left: 16px;
      font-size: 14px;
      font-weight: 700;
    }

    button:hover {
      background: var(--primary-darken);
      cursor: pointer;
    }


    form {
      display: flex;
      flex-direction: column;
      width: 300px;
    }

    #login-button {
      margin: 0;
    }

    #menu-wrapper {
      cursor: pointer;
    }

    #thumbnail {
      font-family: 'Roboto', sans-serif;
      margin: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      width: 40px;
      height: 40px;
      background-color: var(--thumbnail);
      font-weight: bold;
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      color: var(--white);
      box-shadow: var(--box-shadow);
    }

    #thumbnail:hover {
      background-color: var(--thumbnail-darken);
    }

    .hide {
      display: none;
    }

    #menu {
      background: var(--thumbnail);
      color: var(--white);
      border-radius: 5px;
      padding: 0;
      width: 110px;
      position: absolute;
      right: 0;
    }

    .menu-item {
      margin: 0;
      font-size: 13px;
      padding: 6px;
      text-align: center;
      font-weight: bold;
    }

    .menu-item:hover {
      background-color: var(--thumbnail-darken);
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
    const url = PATH_ID.LOGIN;
    history.pushState({ url }, null, url);
  };

  checkLoginStatus = async () => {
    if (!auth.getUserAuth()) {
      this.renderLoginButton();

      return;
    }

    const userFirstName = await auth.getUserFirstName();
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
    auth.deleteUserAuth();
    window.dispatchEvent(new CustomEvent('@route-logout', {}));
    renderToastModal('success', SUCCESS_MESSAGE.LOGOUT_COMPLETE);
  };
}

customElements.define('user-menu', UserMenu);
