const signupTemplate = document.createElement('template');

signupTemplate.innerHTML = `
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
  </style>

  <div class="modal-container" >
    <div class="dimmer"></div>
    <div class="modal-inner" role="dialog">
      <div class="x-shape">X</div>
      <section>
        <h1>회원가입</h1>
        <form>
          <label>이메일</label>
          <input type="email" placeholder="이메일 주소를 입력해주세요" />
          <label>이름</label>
          <input type="text" placeholder="이름을 입력해주세요" />
          <label>비밀번호</label>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
          <label>비밀번호 확인</label>
          <input type="password" placeholder="비밀번호를 입력해주세요" />
          <button type="submit">확인</button>
        </form>
      </section>
    </div>
  </div>
`;

class Signup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(signupTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    // 이벤트 추가
    this.shadowRoot.querySelector('form').addEventListener('submit', this.signup);
    this.shadowRoot.querySelector('.x-shape').addEventListener('click', this.closeModal);
    this.shadowRoot.addEventListener('click', this.closeModalDimmer);
  }

  disconnectedCallback() {
    // 이벤트 삭제
    this.shadowRoot.querySelector('form').removeEventListener('submit', this.signup);
    this.shadowRoot.querySelector('.x-shape').removeEventListener('click', this.closeModal);
    this.shadowRoot.removeEventListener('click', this.closeModalDimmer);
  }

  closeModalDimmer = (event) => {
    event.target === this.shadowRoot.querySelector('.dimmer') ? this.closeModal() : false;
  };

  closeModal = () => {
    this.remove();
  };

  signup = (event: SubmitEvent) => {
    event.preventDefault();
    const name = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='text']")).value;
    const email = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='email']")).value;
    const password = (<HTMLInputElement>this.shadowRoot.querySelector("input[type='password']"))
      .value;

    const url = 'https://json-server-marco.herokuapp.com/signup/';
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
          console.log('회원가입 실패');
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
        console.log('회원가입 성공');
        // TODO 회원가입 성공 후 라우트
        this.closeModal();
        this.emitRouteLogin();
      })
      .catch((error) => console.error('에러', error));
  };

  emitRouteLogin = () => {
    const event = new CustomEvent('@route-login', {});
    window.dispatchEvent(event);
  };
}

customElements.define('sign-up', Signup);
