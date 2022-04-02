const loginTemplate = document.createElement('template');

loginTemplate.innerHTML = `
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

    .signup-link {

    }
  </style>

  <section>
    <h1>로그인</h1>
    <form>
      <label>이메일</label>
      <input type="email" placeholder="woowacourse@gmail.com" />
      <label>비밀번호</label>
      <input type="password" placeholder="비밀번호를 입력해주세요" />
      <button type="submit">로그인</button>
    </form>
    <span>아직 회원이 아닌가요?<a href="/">회원가입</a></span>
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
