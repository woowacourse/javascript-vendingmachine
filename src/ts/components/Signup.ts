const template = document.createElement('template');
template.innerHTML = `
  <style>
  </style>

  <div>
    <h1>회원가입</h1>
    <form>
      <label>이름</label>
      <input type="text" />
      <label>이메일</label>
      <input type="email" />
      <label>비밀번호</label>
      <input type="password" />
      <button type="submit">회원가입</button>
    </form>
  </div>
`;

class Signup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // 이벤트 추가
    this.shadowRoot.querySelector('form').addEventListener('submit', this.signup);
  }

  disconnectedCallback() {
    // 이벤트 삭제
    this.shadowRoot.querySelector('form').removeEventListener('submit', this.signup);
  }

  signup = (event: SubmitEvent) => {
    event.preventDefault();
    const name = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='text']")).value;
    const email = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='email']")).value;
    const password = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='password']"))
      .value;

    const url = 'http://localhost:3000/signup/';
    const data = {
      email,
      password,
      name,
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
          alert('회원가입 잘 쓰세요.>ㅇ<');
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

customElements.define('sign-up', Signup);
