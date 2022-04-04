const loginTemplate = document.createElement('template');

loginTemplate.innerHTML = `
  <style>
    .modal-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background: transparent;
    }

    .hide {
      display: none !important;
    }

    .dimmer {
      position: absolute;
      width: 100%;
      height: 100%;
      background: transparent;
    }

    .modal-inner {
      height: 500px;
      position: relative;
      background: var(--white);
      border: 1px solid var(--secondary);
      border-radius: 4px;
      padding: 20px 30px;
    }

    .x-shape {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      justify-content: flex-end;
      cursor: pointer;
    }


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

  <div class="modal-container" >
    <div class="dimmer"></div>
    <div class="modal-inner" role="dialog">
      <div class="x-shape">X</div>
      <section>
        <h1>로그인</h1>
        <form>
          <label>이메일</label>
          <input type="email" placeholder="woowacourse@gmail.com" />
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
          <button type="submit">확인</button>
        </form>
        <span>아직 회원이 아닌가요?<a href="/">회원가입</a></span>
      </section>
    </div>
  </div>
`;

class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('form').addEventListener('submit', this.login);
    this.shadowRoot.querySelector('.x-shape').addEventListener('click', this.closeModal);
    this.shadowRoot.addEventListener('click', this.closeModalDimmer);
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('form').removeEventListener('submit', this.login);
    this.shadowRoot.querySelector('.x-shape').removeEventListener('click', this.closeModal);
    this.shadowRoot.removeEventListener('click', this.closeModalDimmer);
  }

  closeModalDimmer = (event) => {
    event.target === this.shadowRoot.querySelector('.dimmer') ? this.closeModal() : false;
  };

  closeModal = () => {
    this.remove();
  };

  login = (event: SubmitEvent) => {
    event.preventDefault();
    const email = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='email']")).value;
    const password = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='password']"))
      .value;

    const url = 'https://json-server-marco.herokuapp.com/login/';
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
          console.log('login, 로그인 실패');
          return;
        }
        return res.json();
      })
      .then((response) => {
        const userAuth = {
          accessToken: response.accessToken,
          id: response.user.id,
        };
        console.log('login, 로그인 성공');
        localStorage.setItem('userAuth', JSON.stringify(userAuth));
        this.emitRouteLogin();
      })
      .catch((error) => console.error('에러', error));
  };

  emitRouteLogin = () => {
    const event = new CustomEvent('@route-login', {});
    window.dispatchEvent(event);
  };
}

customElements.define('log-in', Login);
