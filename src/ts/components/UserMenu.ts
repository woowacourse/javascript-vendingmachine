// TODO 유저 메뉴 컴포넌트
// - [ ] 로그인한 유저의 이름 중 첫번째 글자를 썸네일처럼 만든다.
// - [ ] 로그인한 유저의 썸네일을 클릭하면 select box로 `회원정보수정`과 `로그아웃` 메뉴가 표시된다.

import { $ } from '../utils';

const userMenuTemplate = document.createElement('template');
userMenuTemplate.innerHTML = `
  <style>
    section {
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
  </style>

  <button id="login-button">로그인</button>
  <section class="">
    <h2 hidden>유저 메뉴</h2>
    <h3>👋🏼 <span id="welcome-name"></span>님 안녕하세요.</h3>
    <h4>이름</h4>
    <p id="name">마르코</p>
    <h4>이메일</h4>
    <p id="email">nextjws@gmail.com</p>
    <button id="logout-button">로그아웃</button>
  </section>
`;

class UserMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(userMenuTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // 이벤트 추가
    this.checkLoginStatus();
    this.renderUserMenu();
    this.shadowRoot.querySelector('#logout-button').addEventListener('click', this.logout);
    this.shadowRoot.querySelector('#login-button').addEventListener('click', this.renderLoginModal);
  }

  disconnectedCallback() {
    // 이벤트 삭제
    this.shadowRoot.querySelector('#logout-button').removeEventListener('click', this.logout);
  }

  renderLoginModal = () => {
    const detail = document.createElement('log-in');
    const event = new CustomEvent('@render-log-in', { detail });
    window.dispatchEvent(event);
  };

  checkLoginStatus = () => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (!userAuth) {
      alert('user-menu 에서 알림 : 현재 비로그인 상태');
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
          alert('로그인 안 돼셨어요.>ㅇ<');
          this.renderLoginButton();
          return;
        }
        return res.json();
      })
      .then((response) => this.renderUserThumbnail(response.name[0]))
      .catch((error) => console.error('에러', error));
  };

  renderLoginButton = () => {
    $('.app');
  };

  renderUserThumbnail = (firstName: string) => {
    console.log(firstName);
  };

  renderUserMenu = () => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (!userAuth) {
      alert('user-menu 에서 알림 : 현재 비로그인 상태');
      return;
    }
    const id = userAuth.id;
    const accessToken = `Bearer ${userAuth.accessToken}`;

    const url = `https://json-server-marco.herokuapp.com/users/${id}`;

    const renderUpdatedUserInfo = (response) => {
      console.log(response);
      const name = response.name;
      this.shadowRoot.getElementById('name').textContent = name;
      this.shadowRoot.getElementById('welcome-name').textContent = name;
      const email = response.email;
      this.shadowRoot.getElementById('email').textContent = email;
    };

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
          alert('로그인 안 돼셨어요.>ㅇ<');
          return;
        }
        return res.json();
      })
      .then((response) => renderUpdatedUserInfo(response))
      .catch((error) => console.error('에러', error));
  };

  logout = () => {
    localStorage.removeItem('userAuth');
    // location.replace('../index.html');
  };
}

customElements.define('user-menu', UserMenu);
