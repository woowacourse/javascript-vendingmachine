// TODO 유저 메뉴 컴포넌트
// - [ ] 로그인한 유저의 이름 중 첫번째 글자를 썸네일처럼 만든다.
// - [ ] 로그인한 유저의 썸네일을 클릭하면 select box로 `회원정보수정`과 `로그아웃` 메뉴가 표시된다.

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
    this.loginButton.addEventListener('click', this.renderLoginModal);
    this.thumbnail.addEventListener('click', this.toggleMenu);
    this.profileEditButton.addEventListener('click', this.renderProfileEdit);
    this.logoutButton.addEventListener('click', this.logout);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.renderLoginModal);
    this.thumbnail.removeEventListener('click', this.toggleMenu);
    this.profileEditButton.removeEventListener('click', this.renderProfileEdit);
    this.logoutButton.removeEventListener('click', this.logout);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.checkLoginStatus();
  }

  renderLoginModal = () => {
    const detail = document.createElement('log-in');
    const event = new CustomEvent('@render-login', { detail });
    window.dispatchEvent(event);
  };

  checkLoginStatus = () => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (!userAuth) {
      console.log('user-menu, 로컬스토리지 없음, 로그인 실패');
      this.renderLoginButton();

      return;
    }
    const id = userAuth.id;
    const accessToken = `Bearer ${userAuth.accessToken}`;

    const url = `https://json-server-marco.herokuapp.com/users/${id}`;

    // 로그인
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log('user-menu, 로컬스토리지 있으나 시간만료, 로그인 실패');
          this.renderLoginButton();
          return;
        }
        return res.json();
      })
      .then((response) => {
        console.log('user-menu, 로그인 성공');
        this.renderUserThumbnail(response.name[0]);
      })
      .catch((error) => console.error('에러', error));
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

  renderProfileEdit = () => {
    console.log('회원정보 수정 버튼 호출');
  };

  logout = () => {
    localStorage.removeItem('userAuth');
    const event = new CustomEvent('@route-logout', {});
    window.dispatchEvent(event);
  };
}

customElements.define('user-menu', UserMenu);
