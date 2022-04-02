const profileTemplate = document.createElement('template');
profileTemplate.innerHTML = `
  <style>
  </style>

  <section>
    <h2 hidden>회원정보</h2>
    <h3>👋🏼 <span id="welcome-name"></span>님 안녕하세요.</h3>
    <h4>이름</h4>
    <p id="name">마르코</p>
    <h4>이메일</h4>
    <p id="email">nextjws@gmail.com</p>
    <button id="logout-button">로그아웃</button>
  </section>
`;

class Profile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(profileTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // 이벤트 추가
    this.renderProfile();
    this.shadowRoot.querySelector('#logout-button').addEventListener('click', this.logout);
  }

  disconnectedCallback() {
    // 이벤트 삭제
    this.shadowRoot.querySelector('#logout-button').removeEventListener('click', this.logout);
  }

  renderProfile = () => {
    const userAuth = JSON.parse(localStorage.getItem('userAuth'));

    const id = userAuth.id;
    const accessToken = `Bearer ${userAuth.accessToken}`;

    const url = `http://localhost:3000/600/users/${id}`;

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

customElements.define('user-profile', Profile);
