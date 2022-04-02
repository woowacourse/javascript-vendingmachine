const loginTemplate = document.createElement('template');

loginTemplate.innerHTML = `
  <style>
  </style>

  <section>
    <h2 hidden>로그인</h2>
    <form>
      <label>이메일</label>
      <input type="email" />
      <label>비밀번호</label>
      <input type="password" />
      <button type="submit">로그인</button>
    </form>
  </section>
`;

class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // 이벤트 추가
    this.shadowRoot.querySelector('form').addEventListener('submit', this.login);
  }

  disconnectedCallback() {
    // 이벤트 삭제
    this.shadowRoot.querySelector('form').removeEventListener('submit', this.login);
  }

  login = (event: SubmitEvent) => {
    event.preventDefault();
    const email = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='email']")).value;
    const password = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='password']"))
      .value;

    const url = 'http://localhost:3000/login/';
    const data = {
      email,
      password,
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          alert('로그인 정보 잘 쓰세요.>ㅇ<');
          return;
        }
        return res.json();
      })
      .then((response) => {
        const userAuth = {
          accessToken: response.accessToken,
          id: response.user.id,
        };
        localStorage.setItem('userAuth', JSON.stringify(userAuth));
        // location.replace('../user.html');
      })
      .catch((error) => console.error('에러', error));
  };
}

customElements.define('log-in', Login);
